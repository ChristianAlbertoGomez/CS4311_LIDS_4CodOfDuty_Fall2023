import React, { useState } from 'react';
import './AlertTable.css'; 


const NotificationsTable = () => {
  const initialData = [
    {
      notification: 'New detection: 8:00AM',
    },
    {
      notification: 'New detection: 8:05AM ',
    },
    {
      notification: 'LIDS-D disconnected',
    },
    {
      notification: 'New detection: 1:00PM',
    },
    {
      notification: 'LIDS-D connected',
    }
    // Add more data rows as needed
  ];

  const [notifications, setNotifications] = useState(initialData);

  return (
    <div className="notifications-table">
      <h2>    </h2>
      <table>
        <thead>
          <tr>
            <th>Notifications</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((item, index) => (
            <tr key={index}>
              <td>{item.notification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


};

export default NotificationsTable;