import React, { useRef, useState } from 'react';
import { SubCustomDragLayer } from '../SubCustomDragLayer';
import { SubContainer } from '../SubContainer';
import { resolveReferences, resolveWidgetFieldValue } from '@/_helpers/utils';

export const Container = function Container({
  id,
  component,
  height,
  containerProps,
  width,
  currentState,
  removeComponent,
}) {
  const [currentLayout, setCurrentLayout] = useState(() => {
    if (containerProps.currentLayout !== undefined) {
      return 'desktop';
    } else {
      return containerProps.currentLayout;
    }
  });
  const backgroundColor = component.definition.styles.backgroundColor.value;
  const widgetVisibility = component.definition.styles?.visibility?.value ?? true;
  const disabledState = component.definition.styles?.disabledState?.value ?? false;

  const parsedDisabledState =
    typeof disabledState !== 'boolean' ? resolveWidgetFieldValue(disabledState, currentState) : disabledState;

  let parsedWidgetVisibility = widgetVisibility;

  try {
    parsedWidgetVisibility = resolveReferences(parsedWidgetVisibility, currentState, []);
  } catch (err) {
    console.log(err);
  }

  const computedStyles = {
    backgroundColor,
    width,
    height,
    display: parsedWidgetVisibility ? 'flex' : 'none',
  };

  const parentRef = useRef(null);

  React.useEffect(() => {
    const _currentLayout = currentLayout;
    if (containerProps.currentLayout !== undefined && containerProps.currentLayout !== _currentLayout) {
      setCurrentLayout(containerProps.currentLayout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerProps.currentLayout]);

  return (
    <div
      data-disabled={parsedDisabledState}
      className="jet-container"
      ref={parentRef}
      onClick={() => containerProps.onComponentClick(id, component)}
      style={computedStyles}
    >
      <SubContainer parent={id} {...containerProps} parentRef={parentRef} removeComponent={removeComponent} />
      <SubCustomDragLayer parent={id} parentRef={parentRef} currentLayout={currentLayout} />
    </div>
  );
};
