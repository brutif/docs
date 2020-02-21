const { posix: path } = require('path');

function initInlineManMacro (context, docType) {
  return function () {
    this.process((parent, target, attrs) => {
      const text = target;
      const pageId = path.join(path.dirname(context.file.src.relative), target);
      // NOTE the value of the path attribute is never used, so we can fake it
      const attributes = Opal.hash2(['refid', 'path'], { refid: pageId, path: pageId });
      if (docType == "javadoc") {
        return target;
      }
      else {
        return this.createInline(parent, 'anchor', text, { type: 'link', target: "/docs/ref/" + docType + "/latest/" + target + ".html", attributes });
      }
    })
  }
}

function register (registry, context) {
  registry.inlineMacro('config', initInlineManMacro(context, "config"));
  registry.inlineMacro('feature', initInlineManMacro(context, "feature"));
  registry.inlineMacro('javadoc', initInlineManMacro(context, "javadoc"));
}

module.exports.register = register;