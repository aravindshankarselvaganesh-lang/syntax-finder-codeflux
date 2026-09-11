import zipfile
import xml.etree.ElementTree as ET
import sys

def read_docx(path):
    document_text = []
    try:
        with zipfile.ZipFile(path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            
            # The namespace for word XML
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            for paragraph in tree.findall('.//w:p', ns):
                texts = [node.text for node in paragraph.findall('.//w:t', ns) if node.text]
                if texts:
                    document_text.append(''.join(texts))
                    
        return '\n'.join(document_text)
    except Exception as e:
        return f"Error: {e}"

if __name__ == '__main__':
    if len(sys.argv) > 1:
        print(read_docx(sys.argv[1]))
    else:
        print("Provide path to docx")
