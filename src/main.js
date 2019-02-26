const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')
const xml2js = require('xml2js')
const { validExtension } = require('./lib/utils')

class pptx {

	constructor(file) {
		this.directory = path.resolve()

		this.load(path.join(this.directory, file), (zip) => {
			this.data = zip
			this.parse()
		})
		return console.log('Creating new instance of pptx...')
	}

	load(input, setContext) {
		fs.readFile(input, (err, data) => {
			if (err) throw new Error(err)

			JSZip.loadAsync(data).then(zip => {
				setContext(zip)
				return console.log(`File loaded from ${input}`)
			})
		})
	}

	save(output) {
		this.data.generateAsync({type: 'nodebuffer'})
		.then(content => {
			fs.writeFile(path.join(this.directory, output), content, (err) => {
				if (err) throw new Error(err)
				return console.log(`File saved to ${output}`)
			})
		})
		.catch(err => {
			return console.log(err)
		})
	}

	parse() {
		for (let key in this.data.files) {
			if (validExtension(key)) {
				this.data.file(key).async('string')
				.then(content => {
					xml2js.parseString(content, (err, res) => {
						this.data.files[key] = res
					})
				})
			}
		}
	}

	build() {
		let xml = new xml2js.Builder()

		for (let key in this.data.files) {
			if (validExtension(key)) {
				if (this.data.files[key]) {
					let file = xml.buildObject(this.data.files[key])
					this.data.file(key, file)
				}
			}
		}
	}

	export() {
		const raw = JSON.stringify(this.data.files, null, 2)
		fs.writeFileSync('./log.js', raw)
	}

	update() {
		const id = Date.now().toString().substr(8, 13)

		// update presentation rel, creates relationships between slides and presentation
		// let maxRid = Math.max(...this.data.files['ppt/_rels/presentation.xml.rels'].Relationships.Relationship.map(item => parseInt(item['$'].Id.split('rId')[1]))) + 1

		this.data.files['ppt/_rels/presentation.xml.rels'].Relationships.Relationship.push({
			'$': {
				Id: `rId${id}`,
				Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide',
				Target: `slides/slide${id}.xml`
			}
		})
		// update presentation xml, pulls in slide data with matching id from presentation rel
		// let maxId = Math.max(...this.data.files['ppt/presentation.xml']['p:presentation']['p:sldIdLst'][0]['p:sldId'].map(item => parseInt(item['$'].id))) + 1

		this.data.files['ppt/presentation.xml']['p:presentation']['p:sldIdLst'][0]['p:sldId'].push({
			'$': {
				id: id, 'r:id': `rId${id}`
			}
		})
		// add slide data to files
		this.data.files[`ppt/slides/_rels/slide${id}.xml.rels`] = this.data.files['ppt/slides/_rels/slide1.xml.rels']
		this.data.files[`ppt/slides/slide${id}.xml`] = this.data.files['ppt/slides/slide1.xml']
		// update number of slides in docProps/app xml
		this.data.files['docProps/app.xml'].Properties['Slides'] = parseInt(this.data.files['docProps/app.xml'].Properties['Slides'][0] + 1).toString()
		// update content types
		this.data.files['[Content_Types].xml'].Types.Override.push({
			"$": {
				"PartName": `/ppt/slides/slide${id}.xml`,
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slide+xml"
			}
		})
	}
}

module.exports = pptx
