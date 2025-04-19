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
        }
    },
    tree: {
        elements: {
            trunk: "The tree trunk represents your core strength and stability.",
            crown: "The tree crown symbolizes your growth and aspirations."
        }
    },
    person: {
        type: {
            male: "The male figure may represent significant male influences or self-image.",
            female: "The female figure may represent significant female influences or self-image."
        }
    }
};

export function analyzeDrawing(shapes) {
    const analysis = {
        house: [],
        tree: [],
        person: [],
        overall: []
    };

    // Analyze house elements
    const houseElements = shapes.filter(shape => 
        ['roof', 'wall', 'door', 'window'].includes(shape.type)
    );

    houseElements.forEach(element => {
        if (interpretations.house.elements[element.type]) {
            analysis.house.push(interpretations.house.elements[element.type]);
        }
    });

    // Analyze house size based on wall size if present
    const wall = houseElements.find(el => el.type === 'wall');
    if (wall) {
        if (wall.width > 120) {
            analysis.house.push(interpretations.house.size.large);
        } else if (wall.width < 60) {
            analysis.house.push(interpretations.house.size.small);
        } else {
            analysis.house.push(interpretations.house.size.medium);
        }
    }

    // Analyze tree elements
    const treeElements = shapes.filter(shape => 
        ['trunk', 'crown'].includes(shape.type)
    );

    treeElements.forEach(element => {
        if (interpretations.tree.elements[element.type]) {
            analysis.tree.push(interpretations.tree.elements[element.type]);
        }
    });

    // Analyze person
    const person = shapes.find(shape => ['male', 'female'].includes(shape.type));
    if (person) {
        analysis.person.push(interpretations.person.type[person.type]);
    }

    // Generate overall interpretation
    analysis.overall = [
        "Your drawing reflects your personal view of home, growth, and relationships.",
        "The combination of elements suggests a balanced perspective on life.",
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