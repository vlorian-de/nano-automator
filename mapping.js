const sampleProfileSwitch = { current: 'VLORIAN TEST' };
const sampleKeydown = { ks: 4, kd: 2 }; // 4 is the key code for the knob???
const sampleKnobTurned = { p: 50 };

// Function to check if all conditions are true and execute the action if they are
function executeMappings(mappings, data) {
    mappings.forEach(mapping => {
        // Check if all conditions are true
        const allConditionsTrue = mapping.condition.every(cond => {
            if (typeof cond === 'function') {
                const funcResult = cond(data);
                return funcResult;
            } else if (typeof cond === 'boolean') {
                return cond;
            } else {
                // In case condition is an array of functions
                return cond.reduce((acc, fn) => acc && fn()(data), true);
            }
        });

        // If all conditions are true, execute the action
        if (allConditionsTrue) {
            mapping.action(data);
        }
    });
}

// Test the function
// executeMappings(mappings, sampleKeydown);
// executeMappings(mappings, sampleKnobTurned);

module.exports = {
    executeMappings,
};