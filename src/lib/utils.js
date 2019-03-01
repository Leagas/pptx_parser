module.exports = {

	// only passes for files with extension .xml and .rels
	validExtension: (string) => {
		let ext = string.substr(string.lastIndexOf('.'))

		if (ext === '.xml' || ext === '.rels')
			return true
		return false
	}
}
