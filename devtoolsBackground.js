const panels = chrome && chrome.devtools && chrome.devtools.panels;
const elementsPanel = panels && panels.elements;

if (elementsPanel) {
  elementsPanel.createSidebarPane('Angular Context', function onSidebarCreated(sidebar) {
    elementsPanel.onSelectionChanged.addListener(function updateElementProperties() {
      sidebar.setExpression('(' + getPanelContents.toString() + ')()');
    });
  });
}

// The function below is executed in the context of the inspected page.
function getPanelContents() {
  const angular = window.ng;
  const panelContents = Object.create(null);

  const hasAngular = angular && angular.probe

  if (hasAngular && $0) {
    const context = angular.probe($0);
    if (context) {
      // Get sidebar contents
      Object.assign(panelContents, context._debugContext.context)
      panelContents.__debugContext = context._debugContext
      panelContents.__debugElement = context
      return panelContents
    }
  }

  if (!hasAngular) {
    return Object.assign(Object.create(null), { message: 'There is no Angular application!' })
  } else {
    return Object.assign(Object.create(null), { message: 'This is not Angular Component or Angular prodMode is turned on!' })
  }
}
