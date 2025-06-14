
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeSnippets = [
  `// AI-powered automation
const automateTask = async (task) => {
  const result = await ai.process(task);
  return optimizeWorkflow(result);
};`,
  `// Smart lead generation
function generateLeads(criteria) {
  return ai.analyze(market)
    .filter(lead => matches(criteria))
    .sort(by('potential'));
}`,
  `// Dynamic website optimization
const optimizeSite = (userBehavior) => {
  const insights = ai.analyze(userBehavior);
  return adaptInterface(insights);
};`
];

const AnimatedCode = () => {
  const [currentCode, setCurrentCode] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');

  useEffect(() => {
    const code = codeSnippets[currentCode];
    let index = 0;
    
    const interval = setInterval(() => {
      if (index <= code.length) {
        setDisplayedCode(code.slice(0, index));
        index++;
      } else {
        setTimeout(() => {
          setCurrentCode((prev) => (prev + 1) % codeSnippets.length);
          setDisplayedCode('');
        }, 2000);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentCode]);

  return (
    <motion.div 
      className="bg-gray-900 rounded-lg p-6 font-mono text-sm overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-gray-400 ml-4">AI_Development.js</span>
      </div>
      <pre className="text-gray-300">
        <code>
          {displayedCode.split('\n').map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="leading-relaxed"
            >
              {line}
            </motion.div>
          ))}
        </code>
      </pre>
    </motion.div>
  );
};

export default AnimatedCode;
