const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')
const xml2js = require('xml2js')
const {
	validExtension,
	updateContentRel,
	updatePresentationRel ,
	updateLayoutRel,
	updateSlideRel,
	updateMasterRel
} = require('./lib/utils')

const TMaster = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster'
const TLayout = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout'
const TImage = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image'

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
					let file = xml.p(this.data.files[key])
					this.data.file(key, file)
				}
			}
		}
	}

	slide(index) {
		let data = {
			slide: {
				xml: this.data.files[`ppt/slides/slide${index}.xml`],
				rels: this.data.files[`ppt/slides/_rels/slide${index}.xml.rels`]
			}
		}

		let layout = this.name(data.slide.rels, TLayout)

		data.layout = {
			xml: this.data.files[`ppt/slideLayouts${layout}`],
			rels: this.data.files[`ppt/slideLayouts/_rels${layout}.rels`],
		}

		let master = this.name(data.layout.rels, TMaster)
		let images = this.images(data.slide.rels)

		data.master = {
			xml: this.data.files[`ppt/slideMasters${master}`],
			rels: this.data.files[`ppt/slideMasters/_rels${master}.rels`]
		}

		data.images = images

		return data
	}

	name(rels, type) {
		let name

		rels.Relationships.Relationship.forEach(item => {
			item = item['$']

			if (item.Type == type) {
				name = item.Target.substr(item.Target.lastIndexOf('/'))
			}
		})

		return name
	}

	images(rels) {
		let images = []

		rels.Relationships.Relationship.forEach(item => {
			item = item['$']

			if (item.Type == TImage) {
				images.push(this.data.files[item.Target.replace('..', 'ppt')])
			}
		})

		return images
	}

	create(slide) {
		const id = Date.now().toString().substr(8, 13)

		slide = this.update(slide, id)
	}

	update(data, id) {

		data.slide.rels = updateSlideRel(id, data.images, data.slide.rels)
		data.layout.rels = updateLayoutRel(id)
		data.master.rels = updateMasterRel(id, data.images, data.master.rels)

		return data
	}
}

module.exports = pptx
