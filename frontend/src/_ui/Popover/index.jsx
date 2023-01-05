import '@/_styles/popover.scss';
import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const PopoverComponent = ({
  children,
  open,
  popoverContentClassName = '',
  popoverContent,
  handleToggle,
  side = 'bottom',
}) => {
  const popover = (
    <Popover>
      <Popover.Content className={`PopoverContent ${popoverContentClassName}`}>{popoverContent}</Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger
      positionTop={400}
      onToggle={handleToggle && handleToggle}
      rootClose
      show={open}
      trigger="click"
      placement={side}
      overlay={popover}
      contentClassName="gandharv"
      style={{ zIndex: 0 }}
    >
      {children}
    </OverlayTrigger>
  );
};

export default PopoverComponent;
