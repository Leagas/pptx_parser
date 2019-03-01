1. Load in .pptx using the pptx class:

	const p1 = new pptx('/path/to/file.pptx')

	- This uses JSZip to extract each file as a compressed node buffer.

2. Parse pptx using xml2js

	xml2js.parseString(content)...

	- Using JSZip to convert node buffer to xml string.
	- Then parsed with xml2js to js object tree
	* At this stage the file is ready to be edited/updated etc.

3. Build from object tree back to xml string

	xml2js.Builder().buildObject()...

	- Rebuilds our xml data, and uses JSZip to replace the files old content.

4. Save to file using JSZip

	data.generateAsync({ type: nodebuffer })...

	- Genrate a node buffer and write to file using node fs.


Demo:

	- p1.data.files['ppt/slides/slide1.xml']
	- p1.data.files['ppt/slides/_rels/slide1.xml.rels']
	- p1.data.files['ppt/slideLayouts/_rels/slideLayout2.xml.rels']
	- p1.data.files['[Content_Types].xml']
	- p1.data.files['ppt/_rels/presentation.xml.rels']
	- p1.data.files['ppt/slideMasters/_rels/slideMaster1.xml.rels']

Feature Rich tools: (untested)

	- officegen
	- pdf-powerpoint (uses officegen)
	- pptxgenjs



