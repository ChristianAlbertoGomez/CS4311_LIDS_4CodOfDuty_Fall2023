import React, { useState } from 'react';
import './AlertTable.css'; 


const NotificationsTable = () => {
  const initialData = [
    {
      notification: 'New detection: 09-24-2023 13:25 MST',
    },
    {
      notification: 'New detection: 09-21-2023 12:45 MST ',
    },
    {
      notification: 'LIDS-D disconnected',
    },
    {
      notification: 'New detection: 09-20-2023 17:15 MST',
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