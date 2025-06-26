function parseMarkdown(content) {
    if (!content) return [];
    
    const lines = content.split('\n');
    const elements = [];
    let currentParagraph = [];
    let currentList = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (line === '') {
            // Flush any current content
            if (currentList.length > 0) {
                elements.push({
                    type: 'list',
                    items: [...currentList]
                });
                currentList = [];
            }
            if (currentParagraph.length > 0) {
                elements.push({
                    type: 'paragraph',
                    content: currentParagraph.join(' ').trim()
                });
                currentParagraph = [];
            }
            continue;
        }
        
        // Check if line is a heading (starts and ends with **)
        if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
            // Flush any current content
            if (currentList.length > 0) {
                elements.push({
                    type: 'list',
                    items: [...currentList]
                });
                currentList = [];
            }
            if (currentParagraph.length > 0) {
                elements.push({
                    type: 'paragraph',
                    content: currentParagraph.join(' ').trim()
                });
                currentParagraph = [];
            }
            
            // Add heading
            elements.push({
                type: 'heading',
                content: line.slice(2, -2).trim()
            });
        } 
        // Check if line is a list item (starts with -)
        else if (line.startsWith('- ')) {
            // Flush any current paragraph
            if (currentParagraph.length > 0) {
                elements.push({
                    type: 'paragraph',
                    content: currentParagraph.join(' ').trim()
                });
                currentParagraph = [];
            }
            
            // Add to current list
            currentList.push(line.slice(2).trim());
        } else {
            // Flush any current list
            if (currentList.length > 0) {
                elements.push({
                    type: 'list',
                    items: [...currentList]
                });
                currentList = [];
            }
            
            // Add to current paragraph
            currentParagraph.push(line);
        }
    }
    
    // Don't forget the last content if it exists
    if (currentList.length > 0) {
        elements.push({
            type: 'list',
            items: [...currentList]
        });
    }
    if (currentParagraph.length > 0) {
        elements.push({
            type: 'paragraph',
            content: currentParagraph.join(' ').trim()
        });
    }
    
    return elements;
}

function renderLinks(text) {
    // Simple link parser for [text](url) format
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = linkRegex.exec(text)) !== null) {
        // Add text before the link
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        
        // Add the link
        parts.push(
            <a 
                key={match.index} 
                href={match[2]} 
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
            >
                {match[1]}
            </a>
        );
        
        lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }
    
    return parts.length > 1 ? parts : text;
}

function renderBoldText(text) {
    // Handle inline **bold** text (not headings)
    const boldRegex = /\*\*([^*]+)\*\*/g;
    
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = boldRegex.exec(text)) !== null) {
        // Add text before the bold
        if (match.index > lastIndex) {
            const beforeText = text.slice(lastIndex, match.index);
            const withLinks = renderLinks(beforeText);
            parts.push(withLinks);
        }
        
        // Add the bold text
        parts.push(
            <strong key={match.index} className="font-semibold">
                {match[1]}
            </strong>
        );
        
        lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
        const remainingText = text.slice(lastIndex);
        const withLinks = renderLinks(remainingText);
        parts.push(withLinks);
    }
    
    return parts.length > 1 ? parts : renderLinks(text);
}

export {
	parseMarkdown,
	renderLinks,
	renderBoldText
};