import React from 'react';

export const Modal = ({ children }: any) => {
  return (
    <div
      className="ant-modal-root"
      data-pod-instance-id="0"
      data-id="editor-container"
    >
      <div className="ant-modal-mask"></div>
      <div tabIndex={-1} className="ant-modal-wrap">
        <div
          role="dialog"
          aria-labelledby=":r3:"
          aria-modal="true"
          className="ant-modal"
          style={{ width: "95vw", transformOrigin: "21.7969px 768px" }}
        >
          <div
            tabIndex={0}
            style={{
              width: "0px",
              height: "0px",
              overflow: "hidden",
              outline: "none",
            }}
          ></div>
          <div className="ant-modal-content">
            <button
              type="button"
              aria-label="Close"
              className="ant-modal-close"
            >
              <span className="ant-modal-close-x">
                <span
                  role="img"
                  aria-label="close"
                  id="entity-modal-close-button"
                  className="anticon anticon-close"
                >
                  <svg
                    fill-rule="evenodd"
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="close"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                  </svg>
                </span>
              </span>
            </button>
            <div className="ant-modal-header">
              <div className="ant-modal-title" id=":r3:">
                <div className="entities-editor-modal-header">
                  Trip STO: Create a new
                  <div
                    style={{
                      marginRight: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="information-container button-switch-edit-container-modal"
                      style={{ display: "flex" }}
                    ></div>
                    <span
                      role="img"
                      aria-label="fullscreen"
                      title="Switch to the full screen mode (⌃ + ⌥ + W)"
                      tabIndex={-1}
                      className="anticon anticon-fullscreen button-switch-edit-container-modal"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="fullscreen"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M290 236.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0013.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 000 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 00-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"></path>
                      </svg>
                    </span>
                    <span
                      role="img"
                      aria-label="pic-center"
                      title="Show details side-by-side with the list (⌥ + W)"
                      tabIndex={-1}
                      className="anticon anticon-pic-center button-switch-edit-container-modal"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="ant-modal-body"
              style={{ height: "calc(-200px + 100vh)" }}
            >
              <div id="entities-editor-screen" data-id="entities-editor-screen">
                <div id="no-progress"></div>
                <div id="editor-form-container" data-id="editor-form-container">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <div
            tabIndex={0}
            style={{
              width: "0px",
              height: "0px",
              overflow: "hidden",
              outline: "none",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
