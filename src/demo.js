let slide = {
	"Relationships": {
		"$": {
			"xmlns": "http://schemas.openxmlformats.org/package/2006/relationships"
		},
		"Relationship": [{
			"$": {
				"Id": "rId1",
				"Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout",
				"Target": "../slideLayouts/slideLayout2.xml"
			}
		}]
	}
}

let layout = {
	"Relationships": {
		"$": {
			"xmlns": "http://schemas.openxmlformats.org/package/2006/relationships"
		},
		"Relationship": [{
			"$": {
				"Id": "rId1",
				"Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster",
				"Target": "../slideMasters/slideMaster1.xml"
			}
		}]
	}
}

let content = {
	"Types": {
		"$": {
			"xmlns": "http://schemas.openxmlformats.org/package/2006/content-types"
		},
		"Default": [{
			"$": {
				"Extension": "jpeg",
				"ContentType": "image/jpeg"
			}
		}, {
			"$": {
				"Extension": "rels",
				"ContentType": "application/vnd.openxmlformats-package.relationships+xml"
			}
		}, {
			"$": {
				"Extension": "xml",
				"ContentType": "application/xml"
			}
		}],
		"Override": [{
			"$": {
				"PartName": "/ppt/presentation.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/slideMasters/slideMaster1.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/slides/slide1.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slide+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/tags/tag1.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.tags+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/presProps.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/viewProps.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/theme/theme1.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.theme+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/tableStyles.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/slideLayouts/slideLayout1.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/slideLayouts/slideLayout2.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/slideLayouts/slideLayout3.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/slideLayouts/slideLayout4.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/slideLayouts/slideLayout5.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/slideLayouts/slideLayout6.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/slideLayouts/slideLayout7.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/slideLayouts/slideLayout8.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/slideLayouts/slideLayout9.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/slideLayouts/slideLayout10.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
			}
		}, {
			"$": {
				"PartName": "/ppt/slideLayouts/slideLayout11.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
			}
		}, {
			"$": {
				"PartName": "/docProps/core.xml",
				"ContentType": "application/vnd.openxmlformats-package.core-properties+xml"
			}
		}, {
			"$": {
				"PartName": "/docProps/app.xml",
				"ContentType": "application/vnd.openxmlformats-officedocument.extended-properties+xml"
			}
		}]
	}
}

let presentation = {
	"Relationships": {
		"$": {
			"xmlns": "http://schemas.openxmlformats.org/package/2006/relationships"
		},
		"Relationship": [{
			"$": {
				"Id": "rId3",
				"Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/tags",
				"Target": "tags/tag1.xml"
			}
		}, {
			"$": {
				"Id": "rId7",
				"Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles",
				"Target": "tableStyles.xml"
			}
		}, {
			"$": {
				"Id": "rId2",
				"Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide",
				"Target": "slides/slide1.xml"
			}
		}, {
			"$": {
				"Id": "rId1",
				"Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster",
				"Target": "slideMasters/slideMaster1.xml"
			}
		}, {
			"$": {
				"Id": "rId6",
				"Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
				"Target": "theme/theme1.xml"
			}
		}, {
			"$": {
				"Id": "rId5",
				"Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps",
				"Target": "viewProps.xml"
			}
		}, {
			"$": {
				"Id": "rId4",
				"Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps",
				"Target": "presProps.xml"
			}
		}]
	}
}
