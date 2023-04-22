from trafilatura import fetch_url, extract, bare_extraction

def extract_article(url:str):
    '''
    Input: a string with a url to an article

    Output: a dictionary with:
        - the title, 
        - the body text in markdown, 
        - xml, 
        - url,
        - date,
        - author  
    '''

    article_html = fetch_url(url)

    article_metadata = bare_extraction(article_html)
    article_xml = extract(article_html, output_format="xml")
    article_markdown = extract(article_html, include_formatting=True)

    article = {
        "title": article_metadata["title"],
        "markdown": article_markdown,
        "xml": article_xml,
        "url": url,
        "date": article_metadata["date"],
        "author": article_metadata["author"]
    }

    return article
