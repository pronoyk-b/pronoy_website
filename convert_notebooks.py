import os
import nbformat
from nbconvert import HTMLExporter
from bs4 import BeautifulSoup
import sys

def convert_notebook_to_html(notebook_path, output_dir):
    # Read the notebook
    with open(notebook_path, 'r', encoding='utf-8') as f:
        notebook = nbformat.read(f, as_version=4)
    
    # Convert to HTML
    html_exporter = HTMLExporter()
    html_exporter.template_name = 'classic'
    body, _ = html_exporter.from_notebook_node(notebook)
    
    # Parse HTML to add custom styling
    soup = BeautifulSoup(body, 'html.parser')
    
    # Create full HTML document
    html_content = f'''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{os.path.basename(notebook_path).replace('.ipynb', '')}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/github.min.css">
        <style>
            body {{
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                line-height: 1.6;
                padding: 2rem;
                max-width: 1200px;
                margin: 0 auto;
                background-color: #f8f9fa;
            }}
            .notebook-container {{
                background: white;
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
            }}
            .cell {{
                margin-bottom: 1rem;
                border-radius: 4px;
            }}
            .input_area {{
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 4px;
                margin-bottom: 0.5rem;
            }}
            .output_area {{
                padding: 1rem;
                background: #ffffff;
                border: 1px solid #e9ecef;
                border-radius: 4px;
            }}
            img {{
                max-width: 100%;
                height: auto;
                margin: 1rem 0;
            }}
            pre {{
                background-color: #f8f9fa !important;
                padding: 1rem !important;
                border-radius: 4px !important;
                margin: 1rem 0 !important;
            }}
            code {{
                color: #e83e8c;
                word-wrap: break-word;
            }}
            h1, h2, h3, h4, h5, h6 {{
                color: #2d3436;
                margin-top: 2rem;
                margin-bottom: 1rem;
            }}
            p {{
                color: #2d3436;
                margin-bottom: 1rem;
            }}
            .anchor-link {{
                display: none;
            }}
        </style>
    </head>
    <body>
        <div class="notebook-container">
            {soup.prettify()}
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js"></script>
        <script>
            hljs.highlightAll();
        </script>
    </body>
    </html>
    '''
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Write the HTML file
    output_path = os.path.join(output_dir, os.path.basename(notebook_path).replace('.ipynb', '.html'))
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    return output_path

def main():
    # Directory containing notebooks
    notebooks_dir = 'notebooks'
    # Output directory for HTML files
    output_dir = 'projects'
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Convert all notebooks in the directory
    for file in os.listdir(notebooks_dir):
        if file.endswith('.ipynb'):
            notebook_path = os.path.join(notebooks_dir, file)
            output_path = convert_notebook_to_html(notebook_path, output_dir)
            print(f'Converted {file} to {output_path}')

if __name__ == '__main__':
    main()
