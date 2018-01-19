import Module from 'module';
const originalRequire = Module.prototype.require;

function hasExtension(filename) {
  const lastPathSeparator = filename.lastIndexOf('/');
  return ~filename.indexOf('.', lastPathSeparator);
}

function isInternalDependency(filename) {
  return filename.startsWith('.');
}

Module.prototype.require = function (...args) {
  const [filename, ...rest] = args;

  if (!isInternalDependency(filename) && hasExtension(filename)) {
    return originalRequire.call(this, ...args);
  }

  try {
    return originalRequire.call(this, filename + '.web', ...rest);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return originalRequire.call(this, ...args);      
    }

    throw err;
  }
};