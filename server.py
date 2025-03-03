from flask import Flask, request, jsonify
from flask_cors import CORS 
import fitz  # PyMuPDF
from openai import OpenAI
import json
import chardet
import docx
client = OpenAI(api_key="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")
model = "gpt-4o-mini"

app = Flask(__name__)
CORS(app)

@app.route('/api/analyze', methods=['POST'])
def process_data():
    try:
        data = request.form  
        description = data.get("description")
        link = data.get("link")  
        file = request.files.get("file")  

        file_content = ""
        if file:
            filename = file.filename
            if filename.endswith('.pdf'):
                # PDF
                pdf_document = fitz.open(stream=file.read(), filetype="pdf")
                for page_num in range(pdf_document.page_count):
                    page = pdf_document.load_page(page_num)
                    file_content += page.get_text()
            elif filename.endswith('.doc') or filename.endswith('.docx'):
                # Doc and Docx
                doc = docx.Document(file)
                for paragraph in doc.paragraphs:
                    file_content += paragraph.text + "\n"
            else:
                # Other file types
                raw_data = file.read()
                result = chardet.detect(raw_data)
                encoding = result['encoding']
                file_content = raw_data.decode(encoding)  # 使用检测到的编码解码文件内容
        data = description + file_content
        prompt = (
          f"Analyze the following data about a product and provide a detailed JSON response for promotion purposes."
          f"The JSON should be as detailed and comprehensive as possible and strictly follow this structure: {{\"productName\": \"\", \"productDescription\": \"\", \"demographics\": {{\"age\": \"\", \"gender\": \"\", \"location\": \"\", \"occupation\": \"\", \"interests\": \"\"}}, \"campaign\": {{\"goal\": \"\", \"timeline\": \"\", \"budget\": \"\", \"keyMessage\": \"\", \"additionalInfo\": \"\"}}}}."
          f"Data:\n{data}"
        )
        response = client.chat.completions.create(model=model,
        messages=[
            {"role": "system", "content": "You are a data analyst."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=1024,
        temperature=0.5)
        openai_result = response.choices[0].message.content.strip()
        openai_result = openai_result.strip().strip("```json").strip('```').strip()
        result_json = json.loads(openai_result)
        # 返回 JSON 结果给前端
        return jsonify({"result": result_json})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)