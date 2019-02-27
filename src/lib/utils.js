module.exports = {

	// only passes for files with extension .xml and .rels
	validExtension: (string) => {
		let ext = string.substr(string.lastIndexOf('.'))

		if (ext === '.xml' || ext === '.rels')
			return true
		return false
	},

	layoutRel: (id) => {
		return {
			Relationships: {
				'$': {
					xmlns: "http://schemas.openxmlformats.org/package/2006/relationships"
				},
				Relationship: [{
					'$': {
						Id: `rId${id}`,
						Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMasters",
						Target: `../slideMasters/slideMasters${id}.xml`
					}
				}]
			}
		}
	},

	slideRel: (id, images) => {
		images = images.map((image, index) => {
			return {
				'$': {
					Id: `rId${index+1}`,
					Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout",
					Target: `../media/image${index+1}.xml`
				}
			}
		})

		return {
			Relationships: {
				'$': {
					xmlns: "http://schemas.openxmlformats.org/package/2006/relationships"
				},
				Relationship: [{
					'$': {
						Id: `rId${id}`,
						Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout",
						Target: `../slideLayouts/slideLayout${id}.xml`
					}, ...images
				}]
			}
		}
	},

	contentRel: (id) => {
		return {
			"$": {
				"PartName": `/ppt/slides/slide${id}.xml`,
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slide+xml"
			},
			"$": {
				"PartName": `/ppt/slideLayouts/slideLayout${id}.xml`,
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
			}
		}
	},

	presentationRel: (id) => {
		return {
			rels: {
				'$': {
					Id: `rId${id}`,
					Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide',
					Target: `slides/slide${id}.xml`
				}
			},
			xml: {
				'$': {
					id: id, 'r:id': `rId${id}`
				}
			}
		}
	}
}
