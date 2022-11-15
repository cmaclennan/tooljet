import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Button } from '@/_ui/LeftSidebar';

export const PagehandlerMenu = ({ page, darkMode, handlePageCallback, showMenu, setShowMenu }) => {
  const closeMenu = () => {
    setShowMenu(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && event.target.closest('.pagehandler-menu') === null) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify({ page, showMenu })]);

  return (
    <OverlayTrigger
      trigger={'click'}
      placement={'bottom'}
      rootClose
      show={showMenu}
      overlay={
        <Popover key={page.id} id="page-handler-menu" className={darkMode && 'popover-dark-themed'}>
          <Popover.Content key={page.id} bsPrefix="popover-body">
            <div className="card-body">
              <PageHandleField page={page} updatePageHandle={handlePageCallback} />
              <hr style={{ margin: '0.75rem 0' }} />
              <div className="menu-options mb-0">
                <Field
                  id="rename-page"
                  text="Rename"
                  iconSrc={'assets/images/icons/input.svg'}
                  closeMenu={closeMenu}
                  callback={handlePageCallback}
                />
                <Field
                  id="duplicate-page"
                  text="Duplicate"
                  iconSrc={'assets/images/icons/duplicate.svg'}
                  closeMenu={closeMenu}
                  callback={handlePageCallback}
                />
                <Field
                  id="mark-as-home-page"
                  text="Mark home"
                  iconSrc={'assets/images/icons/home.svg'}
                  closeMenu={closeMenu}
                  callback={handlePageCallback}
                />

                <Field
                  id="hide-page"
                  text="Hide Page"
                  iconSrc={'assets/images/icons/eye.svg'}
                  closeMenu={closeMenu}
                  callback={handlePageCallback}
                />

                <Field
                  id="delete-page"
                  text="Delete page"
                  iconSrc={'assets/images/icons/delete.svg'}
                  customClass="field__danger"
                  closeMenu={closeMenu}
                  callback={handlePageCallback}
                />
              </div>
            </div>
          </Popover.Content>
        </Popover>
      }
    >
      <Button.UnstyledButton onClick={() => setShowMenu(true)} styles={{ height: '20px' }}>
        <Button.Content iconSrc={'assets/images/icons/3dots-menu.svg'} />
      </Button.UnstyledButton>
    </OverlayTrigger>
  );
};

const PageHandleField = ({ page, updatePageHandle }) => {
  const Label = () => {
    return (
      <label htmlFor="pin" className="form-label">
        Page Handle
      </label>
    );
  };

  const content = () => {
    return (
      <div className="col">
        <span style={{ color: '#889096' }}>.../</span>
        <span>{page.handle}</span>
      </div>
    );
  };

  return (
    <div className="mb-2 px-2">
      <Label />
      <Button.UnstyledButton
        onClick={() => {
          updatePageHandle('edit-page-handle');
        }}
        classNames="page-handle-button-container"
      >
        <Button.Content title={content} iconSrc={'assets/images/icons/input.svg'} direction="right" />
      </Button.UnstyledButton>
    </div>
  );
};

const Field = ({ id, text, iconSrc, customClass = '', closeMenu, callback = () => null }) => {
  const handleOnClick = () => {
    closeMenu();
    callback(id);
  };

  return (
    <div className={`field ${customClass ? ` ${customClass}` : ''}`}>
      <Button.UnstyledButton onClick={handleOnClick} styles={{ height: '28px' }}>
        <Button.Content title={text} iconSrc={iconSrc} direction="left" />
      </Button.UnstyledButton>
    </div>
  );
};