import React, { useEffect } from "react";
import "./Notification.css"; // Import the CSS file

const Notification = ({ notifications, onClose }) => {
  useEffect(() => {
    const timers = notifications.map((notification) =>
      setTimeout(() => onClose(notification.id), 5000)
    );
    return () => timers.forEach(clearTimeout);
  }, [notifications, onClose]);

  return (
    <div>
      <ul className="notification-container">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`notification-item ${notification.type}`}
          >
            <div className="notification-content">
              <div className="notification-icon">
                {notification.type === "success" && (
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                )}
                {notification.type === "info" && (
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                )}
              </div>
              <div className="notification-text">{notification.message}</div>
            </div>
            <div
              className="notification-icon notification-close"
              onClick={() => onClose(notification.id)}
            >
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </div>
            <div className="notification-progress-bar" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;