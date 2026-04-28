const bcrypt = require('bcrypt');

const storedHash = '.YmGb4pJL1i1TM6hRR6KeJntCEeM1qWF5AsT7355PdfSghnNCVqu';
const plainPassword = 'MSLMlk';

async function test() {
  console.log('?? Testing password hash...\n');
  console.log('Stored hash:', storedHash);
  console.log('Plain password:', plainPassword);
  
  const isValid = await bcrypt.compare(plainPassword, storedHash);
  console.log('\n? Password match:', isValid);
  
  if (!isValid) {
    console.log('\n? Hash does NOT match the password!');
    console.log('This means the hash was generated with a different password or salt rounds.');
    
    // Generate a new hash for comparison
    const newHash = await bcrypt.hash(plainPassword, 10);
    console.log('\n?? New hash generated:', newHash);
    console.log('Compare with new hash:', await bcrypt.compare(plainPassword, newHash));
  }
}

test();
