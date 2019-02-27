const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')
const xml2js = require('xml2js')
const { validExtension, contentRel, presentationRel } = require('./lib/utils')

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

	// returns a slide at index
	slide(index) {
		if (index < 1) {
			return console.log(`Slide index starts at 1`)
		}

		let rels = this.map(this.data.files[`ppt/slides/_rels/slide${index}.xml.rels`].Relationships.Relationship)

		return {
			slide: {
				xml: this.data.files[`ppt/slides/slide${index}.xml`],
				rels: this.data.files[`ppt/slides/_rels/slide${index}.xml.rels`]
			},
			layout: {
				xml: this.data.files[`ppt/slideLayouts${rels.layout}`],
				rels: this.data.files[`ppt/slideLayouts/_rels${rels.layout}.rels`]
			},
			assets: rels.media
		}
	}

	map(rels) {
		let layout
		let media = []

		rels.forEach(item => {
			let key = item['$'].Target.replace('..', 'ppt')
			let type = item['$'].Type.substr(item['$'].Type.lastIndexOf('/'))

			if (type == '/image') {
				media.push({
					key: key,
					content: this.data.files[key],
					master: item
				})
			}

			if (type == '/slideLayout') {
				layout = key.substr(key.lastIndexOf('/'))
			}
		})

		return {
			media: media,
			layout: layout
		}
	}

	// add a slide
	add(data) {
		// a unique id is needed so we don't overwite any existing slides, we can determine the the next id but might encounter performance issues.
		const id = Date.now().toString().substr(8, 13)

		this.updatePresentation(id)
		this.updateContent(id)
		this.updateSlides(data.slide, id)
		this.updateLayouts(data.layout, id)
		this.updateMedia(data.assets, id)

		// we need to increament the presentation slide count to avoid ppt repair process
		this.data.files['docProps/app.xml'].Properties['Slides'] = parseInt(this.data.files['docProps/app.xml'].Properties['Slides'][0] + 1).toString()
	}

	updatePresentation(id) {
		let presentation = presentationRel(id)

		this.data.files['ppt/_rels/presentation.xml.rels'].Relationships.Relationship.push(presentation.rels)
		this.data.files['ppt/presentation.xml']['p:presentation']['p:sldIdLst'][0]['p:sldId'].push(presentation.xml)
	}

	updateContent(id) {
		let content = contentRel(id)

		this.data.files['[Content_Types].xml'].Types.Override.push(content)
	}

	updateSlides(slide, id) {
		this.data.files[`ppt/slides/_rels/slide${id}.xml.rels`] = slide.rels
		this.data.files[`ppt/slides/slide${id}.xml`] = slide.xml
	}

	updateLayouts(layout, id) {
		this.data.files[`ppt/slideLayouts/slideLayout${id}.xml`] = layout.xml
		this.data.files[`ppt/slideLayouts/_rels/slideLayout${id}.xml.rels`] = layout.rels
	}

	updateMedia(data) {
		data.forEach(media => {
			this.data.files[media.key] = media.content
			this.updateMaster(media.master)
		})
	}

	updateMaster(rel) {
		this.data.files['ppt/slideMasters/_rels/slideMaster1.xml.rels'].Relationships.Relationship.push(rel)
	}

	export() {
		const raw = JSON.stringify(this.data.files, null, 2)
		fs.writeFileSync('./log.js', raw)
	}
}

module.exports = pptx
