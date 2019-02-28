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
						Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster",
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
					Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
					Target: `../media/image${id+index}.jpg`
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
					Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
					Target: `../media/image${id+index}.jpg`
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

	updateContent: (id) => {
		return [
			{
				"$": {
					"PartName": `/ppt/slides/slide${id}.xml`,
					"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slide+xml"
				},
			},
			{
				"$": {
					"PartName": `/ppt/slideLayouts/slideLayout${id}.xml`,
					"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
				},
			},
			{
				"$": {
					"PartName": `/ppt/slideMasters/slideMaster${id}.xml`,
					"ContentType": "aapplication/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"
				}
			}
		]
	},

	updatePresentation: (id) => {
		return {
			rels: [
				{
					'$': {
						Id: `rId${id+1}`,
						Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide',
						Target: `slides/slide${id}.xml`
					},
				},
				{
					'$': {
						Id: `rId${id+2}`,
						Type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster",
						Target: `slideMasters/slideMasters${id}.xml`
					}
				}
			],
			xml: {
				'$': {
					id: id, 'r:id': `rId${id}`
				}
			},
			master: {
				'$': {
					id: id, 'r:id': `rId${id}`
				}
			}
		}
	}
}
