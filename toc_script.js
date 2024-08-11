console.log("toc script")

function AddToc (){

    // Create TOC container
    const tocContainer = document.createElement('div');
    tocContainer.className = 'toc-container';
    
    const tocHeader = document.createElement('h2');
    tocHeader.textContent = 'Table of Contents';
    tocContainer.appendChild(tocHeader);
    
    const tocList = document.createElement('ul');
    tocContainer.appendChild(tocList);
    
    // Collect h1 and h2 tags
    const headings = document.querySelectorAll('h1, h2');
    headings.forEach((heading, index) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        // Set an ID for each heading if it doesn't have one
        if (!heading.id) {
            heading.id = `toc-heading-${index}`;
        }
        
        link.href = `#${heading.id}`;
        link.textContent = `👉 ${heading.textContent}`;
        // link.textContent = heading.textContent;
        
        // Indent h2 tags
        if (heading.tagName.toLowerCase() === 'h2') {
            listItem.style.paddingLeft = '20px';
        }
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
    
    // Insert TOC into the page
    document.body.appendChild(tocContainer);
}

AddToc();
