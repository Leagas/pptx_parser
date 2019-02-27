module.exports = {

	// only passes for files with extension .xml and .rels
	validExtension: (string) => {
		let ext = string.substr(string.lastIndexOf('.'))

		if (ext === '.xml' || ext === '.rels')
			return true
		return false
	},

	contentXML: (id) => {
		return {
			"$": {
				"PartName": `/ppt/slides/slide${id}.xml`,
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slide+xml"
			}
		}
	},

	presentationXML: (id) => {
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
