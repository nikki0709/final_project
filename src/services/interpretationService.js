// Predefined interpretations for different elements and their positions
const interpretations = {
    house: {
        size: {
            large: "The large house suggests a focus on home life and strong domestic values.",
            small: "The small house might indicate a preference for simplicity and manageability.",
            medium: "The balanced house size shows practical and realistic attitudes toward home life."
        },
        elements: {
            door: "The presence of a door shows openness to connections with others.",
            window: "Windows represent your viewpoint on the world and openness to new experiences.",
            roof: "The roof symbolizes protection and shelter in your life.",
            wall: "Walls represent boundaries and structure in your life."
        },
        position: {
            top: "Placing the house in the upper area might indicate optimism and aspiration.",
            bottom: "Placing the house in the lower area suggests groundedness and stability.",
            left: "Position on the left may indicate focus on past experiences and memories.",
            right: "Position on the right might suggest future orientation and goals.",
            center: "Central placement indicates balanced perspective and present-focus."
        }
    },
    tree: {
        elements: {
            trunk: "The tree trunk represents your core strength and stability.",
            crown: "The tree crown symbolizes your growth and aspirations."
        },
        position: {
            top: "A tree placed high suggests high aspirations and idealism.",
            bottom: "Lower placement of the tree indicates being well-grounded.",
            left: "Tree on the left might represent connection to your roots.",
            right: "Tree on the right could indicate future growth orientation.",
            center: "Centered tree placement suggests current life focus."
        }
    },
    person: {
        type: {
            male: "The male figure may represent significant male influences or self-image.",
            female: "The female figure may represent significant female influences or self-image."
        },
        position: {
            top: "Placing the figure high might indicate high self-esteem or aspirations.",
            bottom: "Lower placement could suggest practicality or current challenges.",
            left: "Position on the left may indicate connection to past relationships.",
            right: "Right-side placement might suggest future social aspirations.",
            center: "Central placement indicates current self-focus."
        }
    },
    relative_position: {
        house_person_close: "Close proximity between house and person suggests strong connection to home.",
        house_tree_close: "House and tree nearby indicates balance between shelter and growth.",
        tree_person_close: "Person near tree shows connection to personal growth.",
        all_spread: "Spread placement suggests diverse life aspects in balance.",
        all_clustered: "Clustered placement indicates integrated life perspective."
    }
};

function determinePosition(shape, canvasWidth, canvasHeight) {
    const centerX = shape.position.x + (shape.width / 2);
    const centerY = shape.position.y + (shape.height / 2);
    
    // Divide canvas into thirds horizontally and vertically
    const horizontalThird = canvasWidth / 3;
    const verticalThird = canvasHeight / 3;
    
    let horizontal = '';
    let vertical = '';
    
    // Determine horizontal position
    if (centerX < horizontalThird) {
        horizontal = 'left';
    } else if (centerX > horizontalThird * 2) {
        horizontal = 'right';
    } else {
        horizontal = 'center';
    }
    
    // Determine vertical position
    if (centerY < verticalThird) {
        vertical = 'top';
    } else if (centerY > verticalThird * 2) {
        vertical = 'bottom';
    } else {
        vertical = 'center';
    }
    
    return { horizontal, vertical };
}

function analyzeRelativePositions(shapes, canvasWidth, canvasHeight) {
    const house = shapes.find(s => ['roof', 'wall'].includes(s.type));
    const tree = shapes.find(s => ['trunk', 'crown'].includes(s.type));
    const person = shapes.find(s => ['male', 'female'].includes(s.type));
    
    const insights = [];
    
    if (house && person) {
        const distance = Math.hypot(
            (house.position.x + house.width/2) - (person.position.x + person.width/2),
            (house.position.y + house.height/2) - (person.position.y + person.height/2)
        );
        if (distance < canvasWidth / 4) {
            insights.push(interpretations.relative_position.house_person_close);
        }
    }
    
    if (house && tree) {
        const distance = Math.hypot(
            (house.position.x + house.width/2) - (tree.position.x + tree.width/2),
            (house.position.y + house.height/2) - (tree.position.y + tree.height/2)
        );
        if (distance < canvasWidth / 4) {
            insights.push(interpretations.relative_position.house_tree_close);
        }
    }
    
    if (tree && person) {
        const distance = Math.hypot(
            (tree.position.x + tree.width/2) - (person.position.x + person.width/2),
            (tree.position.y + tree.height/2) - (person.position.y + person.height/2)
        );
        if (distance < canvasWidth / 4) {
            insights.push(interpretations.relative_position.tree_person_close);
        }
    }
    
    if (insights.length === 0) {
        insights.push(interpretations.relative_position.all_spread);
    } else if (insights.length > 2) {
        insights.push(interpretations.relative_position.all_clustered);
    }
    
    return insights;
}

export function analyzeDrawing(shapes, canvasWidth = 800, canvasHeight = 600) {
    const analysis = {
        house: [],
        tree: [],
        person: [],
        overall: []
    };

    // Analyze house elements and position
    const houseElements = shapes.filter(shape => 
        ['roof', 'wall', 'door', 'window'].includes(shape.type)
    );

    houseElements.forEach(element => {
        if (interpretations.house.elements[element.type]) {
            analysis.house.push(interpretations.house.elements[element.type]);
        }
    });

    // Get main house element (wall) for position analysis
    const wall = houseElements.find(el => el.type === 'wall');
    if (wall) {
        const position = determinePosition(wall, canvasWidth, canvasHeight);
        analysis.house.push(interpretations.house.position[position.horizontal]);
        if (position.vertical !== 'center') {
            analysis.house.push(interpretations.house.position[position.vertical]);
        }
        
        // Analyze size
        if (wall.width > 120) {
            analysis.house.push(interpretations.house.size.large);
        } else if (wall.width < 60) {
            analysis.house.push(interpretations.house.size.small);
        } else {
            analysis.house.push(interpretations.house.size.medium);
        }
    }

    // Analyze tree elements and position
    const treeElements = shapes.filter(shape => 
        ['trunk', 'crown'].includes(shape.type)
    );

    treeElements.forEach(element => {
        if (interpretations.tree.elements[element.type]) {
            analysis.tree.push(interpretations.tree.elements[element.type]);
        }
    });

    // Get main tree element (trunk) for position analysis
    const trunk = treeElements.find(el => el.type === 'trunk');
    if (trunk) {
        const position = determinePosition(trunk, canvasWidth, canvasHeight);
        analysis.tree.push(interpretations.tree.position[position.horizontal]);
        if (position.vertical !== 'center') {
            analysis.tree.push(interpretations.tree.position[position.vertical]);
        }
    }

    // Analyze person and position
    const person = shapes.find(shape => ['male', 'female'].includes(shape.type));
    if (person) {
        analysis.person.push(interpretations.person.type[person.type]);
        const position = determinePosition(person, canvasWidth, canvasHeight);
        analysis.person.push(interpretations.person.position[position.horizontal]);
        if (position.vertical !== 'center') {
            analysis.person.push(interpretations.person.position[position.vertical]);
        }
    }

    // Analyze relative positions
    const relativeInsights = analyzeRelativePositions(shapes, canvasWidth, canvasHeight);
    analysis.overall = [
        "Your drawing reflects your personal view of home, growth, and relationships.",
        ...relativeInsights,
        "The placement and proportion of elements indicate your current life priorities."
    ];

    // Format the results
    return {
        house: analysis.house.join(" "),
        tree: analysis.tree.join(" "),
        person: analysis.person.join(" "),
        overall: analysis.overall.join(" ")
    };
} 