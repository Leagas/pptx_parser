const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')
const xml2js = require('xml2js')
const { validExtension, contentXML, presentationXML } = require('./lib/utils')

class pptx {

	constructor(file) {
		this.slides = []
		this.directory = path.resolve()

		this.load(path.join(this.directory, file), (zip) => {
			this.data = zip
			this.parse()
		})
		return console.log('Creating new instance of pptx...')
	}

	// extracts each asset from the ppt as a nodebuffer
	load(input, setContext) {
		fs.readFile(input, (err, data) => {
			if (err) throw new Error(err)

			JSZip.loadAsync(data).then(zip => {
				setContext(zip)
				return console.log(`File loaded from ${input}`)
			})
		})
	}

	// writes nodebuffer to file
	save(output) {
		output = output ? output : './output/test.pptx'

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

	// parses the node buffer as a js object tree
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

	// compiles the js object tree as a string of xml
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

	// maps all default slides, note this will miss our slides with randomized indexes
	map() {
		let max = parseInt(this.data.files['docProps/app.xml'].Properties['Slides'][0])

		for (let index = 0; index < max; index + 1) {
			return this.slides[index] = {
				rels: this.data.files[`ppt/slides/_rels/slide${index+1}.xml.rels`],
				xml: this.data.files[`ppt/slides/slide${index+1}.xml`],
			}
		}
	}

	// returns a slide at index
	slide(index) {
		if (index < 1) {
			return console.log(`Slide index starts at 1`)
		}

		return this.slides[index-1]
	}

	// add a slide
	add(slide) {
		// a unique id is needed so we don't overwite any existing slides, we can determine the the next id but might encounter performance issues.
		const id = Date.now().toString().substr(8, 13)

		// updates the presentation rels and xml with the new slides id
		this.updatePresentation(id)
		// updates the content types with the new slide type
		this.updateContent(id)
		// appends the new slide id
		this.updateSlides(id, slide)

		// we need to increament the presentation slide count to avoid ppt repair process
		this.data.files['docProps/app.xml'].Properties['Slides'] = parseInt(this.data.files['docProps/app.xml'].Properties['Slides'][0] + 1).toString()
	}

	updatePresentation(id) {
		let presentation = presentationXML(id)

		this.data.files['ppt/_rels/presentation.xml.rels'].Relationships.Relationship.push(presentation.rels)
		this.data.files['ppt/presentation.xml']['p:presentation']['p:sldIdLst'][0]['p:sldId'].push(presentation.xml)
	}

	updateContent(id) {
		let content = contentXML(id)

		this.data.files['[Content_Types].xml'].Types.Override.push(content)
	}

	updateSlides(id, slide) {
		this.data.files[`ppt/slides/_rels/slide${id}.xml.rels`] = slide.rels
		this.data.files[`ppt/slides/slide${id}.xml`] = slide.xml
	}

	export() {
		const raw = JSON.stringify(this.data.files, null, 2)
		fs.writeFileSync('./log.js', raw)
	}
}

module.exports = pptx
