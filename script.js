document.addEventListener('DOMContentLoaded', function() {
    const svg = document.getElementById('mindMapSvg');
    let hoveredNode = null;

    // Define nodes
    const nodes = [
        { id: 'cat1', label: 'Category1', x: 245, y: 50, color: '#ffccff' },
        { id: 'cat2', label: 'Category2', x: 520, y: 50, color: '#ff9999' },
        { id: 'otto', label: 'Otto Cycle Engine', x: 460, y: 320, color: '#9b4dca' },
        { id: 'racing', label: 'Racing', x: 130, y: 145, color: '#ff9999' },
        { id: 'motorsports', label: 'Motorsports', x: 138, y: 252, color: '#ffccff' },
        { id: 'roadTrips', label: 'Road Trips', x: 140, y: 310, color: '#ff9999' },
        { id: 'expressionArt', label: 'Expression in Art', x: 140, y: 370, color: '#ff9999' },
        { id: 'motorcycles', label: 'Motorcycles', x: 245, y: 205, color: '#ffccff' },
        { id: 'culture', label: 'Culture', x: 300, y: 310, color: '#ffccff' },
        { id: 'infrastructure', label: 'Increased Infrastructure', x: 270, y: 450, color: '#ff9999' },
        { id: 'aviation', label: 'Aviation', x: 245, y: 145, color: '#ffccff' },
        { id: 'transportation', label: 'Transportation', x: 398, y: 250, color: '#ffccff' },
        { id: 'marineEngines', label: 'Marine Engines', x: 520, y: 145, color: '#ffccff' },
        { id: 'construction', label: 'Construction', x: 360, y: 370, color: '#ffccff' },
        { id: 'industry', label: 'Industry', x: 520, y: 370, color: '#ffccff' },
        { id: 'agriculture', label: 'Agriculture', x: 520, y: 430, color: '#ffccff' },
        { id: 'automobiles', label: 'Automobiles', x: 520, y: 205, color: '#ffccff' },
        { id: 'society', label: 'Society', x: 580, y: 250, color: '#ffccff' },
        { id: 'technology', label: 'Technology', x: 650, y: 310, color: '#ffccff' },
        { id: 'engineRefinement', label: 'Engine Refinement', x: 695, y: 370, color: '#ffccff' },
        { id: 'mechanization', label: 'Mechanization', x: 670, y: 455, color: '#ff9999' },
        { id: 'tradeBenefit', label: 'Increased Trade', x: 365, y: 120, color: '#ff9999' },
        { id: 'military', label: 'Military Improvements', x: 717, y: 120, color: '#ff9999' },
        { id: 'economics', label: 'Improved Economics', x: 735, y: 195, color: '#ff9999' },
        { id: 'environmentIssues', label: 'Environment Issues', x: 780, y: 250, color: '#ff9999' },
        { id: 'emissions', label: 'More Emmisions', x: 775, y: 310, color: '#ffccff' },
        { id: 'efficiency', label: 'Efficiency', x: 790, y: 415, color: '#ffccff' }
    ];

    // Define connections
    const connections = [
        { from: 'otto', to: 'transportation' },
        { from: 'otto', to: 'culture' },
        { from: 'otto', to: 'technology' },
        { from: 'otto', to: 'industry' },
        { from: 'otto', to: 'society' },
        { from: 'transportation', to: 'aviation' },
        { from: 'transportation', to: 'motorcycles' },
        { from: 'transportation', to: 'automobiles' },
        { from: 'transportation', to: 'marineEngines' },
        { from: 'marineEngines', to: 'tradeBenefit' },
        { from: 'aviation', to: 'tradeBenefit' },
        { from: 'marineEngines', to: 'military' },
        { from: 'motorcycles', to: 'racing' },
        { from: 'culture', to: 'expressionArt' },
        { from: 'culture', to: 'roadTrips' },
        { from: 'culture', to: 'motorsports' },
        { from: 'motorsports', to: 'racing' },
        { from: 'industry', to: 'construction' },
        { from: 'industry', to: 'agriculture' },
        { from: 'agriculture', to: 'mechanization' },
        { from: 'construction', to: 'infrastructure' },
        { from: 'technology', to: 'engineRefinement' },
        { from: 'technology', to: 'environmentIssues' },
        { from: 'emissions', to: 'environmentIssues' },
        { from: 'engineRefinement', to: 'efficiency' },
        { from: 'engineRefinement', to: 'emissions' },
        { from: 'society', to: 'environmentIssues' },
        { from: 'society', to: 'economics' },
        { from: 'automobiles', to: 'economics' },
        { from: 'efficiency', to: 'mechanization' },
    ];

    // Draw connections
    connections.forEach((connection, index) => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);
        
        if (!fromNode || !toNode) return;
        
        // Create connection group
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute('data-from', connection.from);
        group.setAttribute('data-to', connection.to);
        group.setAttribute('class', 'connection-group');
        
        // Create path for the line
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute('d', `M${fromNode.x} ${fromNode.y} L${toNode.x} ${toNode.y}`);
        path.setAttribute('stroke', '#330066');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('class', 'connection');
        group.appendChild(path);
        
        // Create arrowhead
        const arrowhead = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const arrowPoints = calculateArrowhead(fromNode.x, fromNode.y, toNode.x, toNode.y);
        arrowhead.setAttribute('points', arrowPoints);
        arrowhead.setAttribute('fill', '#330066');
        arrowhead.setAttribute('class', 'arrowhead');
        group.appendChild(arrowhead);
        
        svg.appendChild(group);
    });
    
    // Draw nodes
    nodes.forEach((node) => {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute('class', 'node-group');
        group.setAttribute('data-id', node.id);
        
        // Create node rectangle
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute('x', node.x - node.label.length * 4);
        rect.setAttribute('y', node.y - 15);
        rect.setAttribute('width', node.label.length * 8);
        rect.setAttribute('height', '30');
        rect.setAttribute('rx', '15');
        rect.setAttribute('ry', '15');
        rect.setAttribute('fill', node.color);
        rect.setAttribute('class', 'node');
        group.appendChild(rect);
        
        // Create node text
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#000000');
        text.setAttribute('class', 'node-text');
        text.textContent = node.label;
        group.appendChild(text);
        
        // Add event listeners
        group.addEventListener('mouseenter', () => {
            hoveredNode = node.id;
            highlightConnections();
        });
        
        group.addEventListener('mouseleave', () => {
            hoveredNode = null;
            resetHighlights();
        });
        
        svg.appendChild(group);
    });
    
    // Function to highlight connections
    function highlightConnections() {
        if (!hoveredNode) return;
        
        // Highlight the node itself
        const nodeEl = document.querySelector(`.node-group[data-id="${hoveredNode}"] .node`);
        if (nodeEl) {
            nodeEl.setAttribute('stroke', '#ff00ff');
            nodeEl.setAttribute('stroke-width', '3');
        }
        
        // Highlight connections and target nodes
        connections.forEach(conn => {
            if (conn.from === hoveredNode) {
                // Highlight connection
                const connectionGroup = document.querySelector(`.connection-group[data-from="${conn.from}"][data-to="${conn.to}"]`);
                if (connectionGroup) {
                    const path = connectionGroup.querySelector('.connection');
                    const arrow = connectionGroup.querySelector('.arrowhead');
                    
                    path.setAttribute('stroke', '#ff00ff');
                    path.setAttribute('stroke-width', '3');
                    arrow.setAttribute('fill', '#ff00ff');
                }
                
                // Highlight target node
                const targetNodeEl = document.querySelector(`.node-group[data-id="${conn.to}"] .node`);
                if (targetNodeEl) {
                    targetNodeEl.setAttribute('stroke', '#ff00ff');
                    targetNodeEl.setAttribute('stroke-width', '3');
                }
            }
        });
    }
    
    // Function to reset highlights
    function resetHighlights() {
        // Reset node highlights
        document.querySelectorAll('.node').forEach(node => {
            node.setAttribute('stroke', 'transparent');
            node.setAttribute('stroke-width', '0');
        });
        
        // Reset connection highlights
        document.querySelectorAll('.connection').forEach(conn => {
            conn.setAttribute('stroke', '#330066');
            conn.setAttribute('stroke-width', '2');
        });
        
        document.querySelectorAll('.arrowhead').forEach(arrow => {
            arrow.setAttribute('fill', '#330066');
        });
    }
    
function calculateArrowhead(x1, y1, x2, y2) {
    const size = 12; // Arrowhead size

    // Calculate midpoint
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    // Calculate the angle of the line
    const angle = Math.atan2(y2 - y1, x2 - x1);

    // Calculate arrowhead points at the midpoint
    const point1X = midX - size * Math.cos(angle - Math.PI / 6);
    const point1Y = midY - size * Math.sin(angle - Math.PI / 6);
    
    const point2X = midX - size * Math.cos(angle + Math.PI / 6);
    const point2Y = midY - size * Math.sin(angle + Math.PI / 6);

    return `${midX},${midY} ${point1X},${point1Y} ${point2X},${point2Y}`;
}

});
