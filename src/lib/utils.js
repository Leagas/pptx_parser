module.exports = {

	// only passes for files with extension .xml and .rels
	validExtension: (string) => {
		let ext = string.substr(string.lastIndexOf('.'))

		if (ext === '.xml' || ext === '.rels')
			return true
		return false
	},

	updateLayoutRel: (id, data) => {
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

	updateSlideRel: (id, images, data) => {
		data.Relationships.Relationship = []

		images.forEach((image, index) => {
			data.Relationships.Relationship.push({
				'$': {
					Id: `rId${id+index}`,
					Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout",
					Target: `../media/image${id+index}.xml`
				}
			})
		})

		data.Relationships.Relationship.push({
			'$': {
				Id: `rId${id}`,
				Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout",
				Target: `../slideLayouts/slideLayout${id}.xml`
			}
		})

		return data
	},

	updateMasterRel: (id, images, data) => {
		images.forEach((image, index) => {
			data.Relationships.Relationship.push({
				'$': {
					Id: `rId${id+index}`,
					Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout",
					Target: `../media/image${id+index}.xml`
				}
			})
		})

		data.Relationships.Relationship.push({
			'$': {
				Id: `rId${id}`,
				Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout",
				Target: `../slideLayouts/slideLayout${id}.xml`
			}
		})

		return data
	},

	updateContentRel: (id) => {
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

	updatePresentationRel: (id) => {
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
