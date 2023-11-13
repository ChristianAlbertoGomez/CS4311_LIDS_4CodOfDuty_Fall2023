
import React, { useState,addEventListener, useEffect, Component } from 'react';
import './CSS Files/AlertTable.css';


class AlertTable extends Component {
  constructor(){
    super();
    this.state={
      data:[{}],
    };
  }

  state={
    // data:[{"level": 'Low',"time": 8.233,"ipSource": '192.12.4.101',"port": 88,"description": 'Multiple password attempts',}],
    data: [{'level': 'Low', 'alert_id': "20", 'time':"9:20", 'src_port': "80", 'dst_port': "90", 'description':"80->90", 'src_ip':"104.1", 'dst_ip': "109.2", 'reason': "for alert in alerts"}],
    sortDirection:'asc',
    sortedColumn:null,
    selectedAlert:null,
    exportModalVisible:false,
    columnVisibility:{
      // level: true,
      // Time: true,
      // ipSource: true,
      // ipDestination: true,
      // Port: true,
      // Description: true, 
      level: true, 
      alert_id:true, 
      time: true, 
      src_port: true,
      dst_port: true,
      description: true,
      src_ip: true, 
      dst_ip: true, 
      reason: true
    },
    menuVisible:false,
    searchQuery:'',

    today:null,
    date: '',
    time: '',
    dateTime: '',

    filteredData:[{}], // trying to get this to work; on line 278, if you do this.state.filteredData, the Export and Details buttons disapear.
  }

  componentDidMount(){
    // Periodically fetch data from the Flask backend
    this.updateData();
    this.interval = setInterval(this.updateData, 5000); // Every 5 seconds
  }

  componentWillUnmount() {
    // Clear the interval when the component is unmounted to prevent memory leaks
    clearInterval(this.interval);
  }

  updateData = () => {
    // Send a GET request to the Flask backend, this works 100%
    fetch('http://127.0.0.1:5000/getData')
      .then(response => response.json())
      .then(datas => {
        this.setState({ data:datas,
          sortDirection:'asc',
          sortedColumn:null,
          selectedAlert:null,
          exportModalVisible:false,
          columnVisibility:{
          // level: true,
          // Time: true,
          // ipSource: true,
          // ipDestination: true,
          // Port: true,
          // Description: true, 
          level: true, 
          alert_id:true, 
          time: true, 
          src_port: true,
          dst_port: true,
          description: true,
          src_ip: true, 
          dst_ip: true, 
          reason: true
        },
          menuVisible:false,
          searchQuery:'',
  
          today:null,
          date: '',
          time: '',
          dateTime: '',
  
          //filteredData:[{}],
          });
        //console.log(this.state.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  today = new Date();
  date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
  time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
  dateTime = this.date+' '+this.time;
  
  

  /*const [data, setData] = useState([{}]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [exportModalVisible, setExportModalVisible] = useState(false);

  const [columnVisibility, setColumnVisibility] = useState({
    Lvl: true,
    Time: true,
    ipSource: true,
    ipDestination: true,
    Port: true,
    Description: true
  });

  const [menuVisible, setMenuVisible] = useState(false);*/

  toggleMenu() {
    this.state.menuVisible.setState(!this.state.menuVisible);
  };
  handleCheckboxChange(columnName) {
    /*setColumnVisibility((prevState) => ({
      ...prevState,
      [columnName]: !prevState[columnName],
    }));*/
    //this.state.columnVisibility[columnName]= !this.state.columnVisibility
    this.state.columnVisibility.setState(!this.state.columnVisibility);
  };


  /*useEffect(() =>{
    fetch("/alerts").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  },[])*/

  compareLevels(a, b) {
    const levels = ['Low', 'Mid', 'High'];
    const levelA = levels.indexOf(a.level);
    const levelB = levels.indexOf(b.level);

    if (this.state.sortDirection === 'asc') {
      return levelA - levelB;
    } else {
      return levelB - levelA;
    }
  };
  // This section is used to sort timestamps based on date and time
  compareTimestamps(a, b) {
    const timestampA = new Date(a.timestamp).getTime();
    const timestampB = new Date(b.timestamp).getTime();

    if (this.state.sortDirection === 'asc') {
      return timestampA - timestampB;
    } else {
      return timestampB - timestampA;
    }
  };

  handleSort(columnName) {
    const direction = this.state.sortedColumn === columnName && this.state.sortDirection === 'asc' ? 'desc' : 'asc';

    const sortedData = [...this.state.data].sort((a, b) => {
      if (columnName === 'timestamp') {
        return this.compareTimestamps(a, b);
      } else if (columnName === 'level') {
        return this.compareLevels(a, b);
      } else {
        return direction === 'asc'
          ? a[columnName] > b[columnName]
            ? 1
            : -1
          : b[columnName] > a[columnName]
          ? 1
          : -1;
      }
    });


    this.state.data=sortedData;
    this.state.sortDirection=direction;
    this.state.sortedColumn=columnName;
  };


  // This section is used to create the filter search bar
  //const [searchQuery, setSearchQuery] = useState('');

  // Function to filter data based on search query
  filteredData = this.state.data?.filter((item) => {  
    // You can customize this filter logic based on your needs  
    //const searchString = `${item.level} ${item.time} ${item.ipSource} ${item.ipDestination} ${item.port} ${item.dest_port} ${item.description}`;
    const searchString = `${item.state?.level} ${item.state?.alert_id} ${item.state?.time} ${item.state?.src_port} ${item.state?.dst_port} ${item.state?.description} ${item.state?.src_ip} ${item.state?.dst_ip} ${item.state?.reason} `;
    return searchString.toLowerCase().includes(this.state.searchQuery?.toLowerCase());
  });

  // Function to handle search input change
  handleSearchChange(event) {
    //this.setSearchQuery(event.target.value);
    this.state.searchQuery=event.target.value
  };

  handleAlertClick(alert) {
    //this.setSelectedAlert(alert);
    this.state.selectedAlert=alert
  };

  handleExport() {
    //this.setExportModalVisible(true);
    this.state.exportModalVisible=true
  };




  render() {
    //const{menuVisible}=this.state[menuVisible]

    return (
      
      <div className='table-container'>
          <input
            className = "filter-search-bar"
            type="text"
            placeholder="Search..."
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
          />
        <button onClick={this.toggleMenu}>Toggle Menu</button>
        {this.state.menuVisible && (
        <div id='menu'>
          <label>
            <input
              type="checkbox"
              checked={this.state.columnVisibility.column1}
              onChange={() => this.handleCheckboxChange('Level')}
            />
            Level
          </label>
          <label>
            <input
              type="checkbox"
              checked={this.state.columnVisibility.column2}
              onChange={() => this.handleCheckboxChange('Alert ID')}
            />
            Alert ID
          </label>
          <label>
            <input
              type="checkbox"
              checked={this.state.columnVisibility.column3}
              onChange={() => this.handleCheckboxChange('Time')}
            />
            Time
          </label>
          <label>
            <input
              type="checkbox"
              checked={this.state.columnVisibility.column3}
              onChange={() => this.handleCheckboxChange('SRC Port')}
            />
            SRC Port'
          </label>
          <label>
            <input
              type="checkbox"
              checked={this.state.columnVisibility.column3}
              onChange={() => this.handleCheckboxChange('Dest Port')}
            />
            Dest Port
          </label>
          <label>
            <input
              type="checkbox"
              checked={this.state.columnVisibility.column3}
              onChange={() => this.handleCheckboxChange('Port Description')}
            />
            Port Description
          </label>
          <label>
            <input
              type="checkbox"
              checked={this.state.columnVisibility.column3}
              onChange={() => this.handleCheckboxChange('Src IP')}
            />
            Src IP
          </label>
          <label>
            <input
              type="checkbox"
              checked={this.state.columnVisibility.column3}
              onChange={() => this.handleCheckboxChange('Dest IP')}
            />
            Dest IP
          </label>
          <label>
            <input
              type="checkbox"
              checked={this.state.columnVisibility.column3}
              onChange={() => this.handleCheckboxChange('Alert Description')}
            />
            Alert Description
          </label>
          </div>
          )}
    

    //Fix the table sort
        <table id='sortable-table'>
          <thead>
            <tr>
              {this.state.columnVisibility?.Lvl && <th onClick={() => this.handleSort('level')}>
                Level {this.state.sortedColumn === 'level' && <span>{this.state.sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </th> }



              {this.state.columnVisibility?.alert_id && <th>Alert ID</th>}

              {this.state.columnVisibility?.Time && <th data-sort="numeric" onClick={() => this.handleSort('time')}>
                Time {this.state.sortedColumn === 'time' && <span>{this.state.sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </th>}

              {this.state.columnVisibility?.Port && <th data-sort="numeric" onClick={() => this.handleSort('port')}>
                Port {this.state.sortedColumn === 'port' && <span>{this.state.sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </th>}

              {this.state.columnVisibility?.Port && <th data-sort="numeric" onClick={() => this.handleSort('port')}>
                Port {this.state.sortedColumn === 'port' && <span>{this.state.sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </th>}

              {this.state.columnVisibility?.src_port && <th>Src Port</th>}
              {this.state.columnVisibility?.dst_port && <th>Dst Port</th>}
              
              {this.state.columnVisibility?.ipDestination && <th>IP Destination</th>}
            
              
              {this.state.columnVisibility?.Port && <th data-sort="numeric" onClick={() => this.handleSort('port')}>
                Port {this.state.sortedColumn === 'port' && <span>{this.state.sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </th>}
            
              {this.state.columnVisibility?.Description && <th>Description</th>}
              <th>Actions</th>
              </tr>
          </thead>
          <tbody>
            {this.state.data?.map((item, index) => (//this.filteredData?.map((item, index) => (
              <tr key={index}>
                {this.state.columnVisibility?.Lvl &&<td className={item.level?.toLowerCase()}>{item.level}</td>}
                {this.state.columnVisibility?.Time && <td>{item.time}</td>}

                {this.state.columnVisibility?.ipSource &&<td>{item.ipSource}</td>}


                {this.state.columnVisibility?.ipDestination &&<td>{item.ipDestination}</td>}
              
            
                {this.state.columnVisibility?.Port && <td>{item.port}</td>}
            
                {this.state.columnVisibility?.Description && <td >{item.description}</td>}
                <td>
                  <button onClick={() => this.handleExport()}>Export</button>
                  <button onClick={() => this.handleAlertClick(item)}>Details</button>
                </td>
              </tr>
                

    //         </thead>
    //         <tbody>
    //           {data.map((item, index) => (
    //             <tr key={index}>
    //               <td className={item.level?.toLowerCase()}>{item.level}</td>
    //               <td>{item.time}</td>
    //               <td>{item.ip}</td>
    //               <td>{item.port}</td>
    //               <td>{item.description}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>

            ))}
          </tbody>
          
        </table>
        {this.state.selectedAlert && (
          <AlertDetailsModal
            alert={this.state.selectedAlert}
            onClose={() => this.setSelectedAlert(null)}
            onExport={() => this.handleExport()}
          />
        )}
        {this.state.exportModalVisible && (
          <ExportOptionsModal
            onClose={() => this.setExportModalVisible(false)}
          />
        )}
      </div>
    );
  }
}


const AlertDetailsModal = ({ alert, onClose, onExport }) => {
  return (
    <div className="alert-details-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h3>Alert Details</h3>
        <p><strong>Level:</strong> {alert.level}</p>
        <p><strong>Alert ID:</strong> {alert.alert_id}</p>
        <p><strong>Time:</strong> {alert.time}</p>
        <p><strong>Src Port:</strong> {alert.src_port}</p>
        <p><strong>Dst Port:</strong> {alert.dst_port}</p>
        <p><strong>Port Description:</strong> {alert.description}</p>
        <p><strong>Src IP:</strong> {alert.src_ip}</p>
        <p><strong>Dst IP:</strong> {alert.dst_port}</p>
        <p><strong>Alert Description:</strong> {alert.reason}</p>
        <button onClick={onExport}>Export</button>
      </div>
    </div>
  );
};

const ExportOptionsModal = ({ onClose }) => {
  return (
    <div className="export-options-modal">
      <div className="modal-content2">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h3>Export Options</h3>
        <div className="export-options">
          <div className="export-option">
            <label>Export As:</label>
            <div className="export-as-options">
              <input
                type="radio"
                id="export-pdf"
                name="export-as"
                value="PDF"
              />
              <label htmlFor="export-pdf">PDF</label>

              <input
                type="radio"
                id="export-xml"
                name="export-as"
                value="XML"
              />
              <label htmlFor="export-xml">XML</label>
            </div>
          </div>

          <div className="export-option">
            <label>Save In:</label>
            <div className="save-in-options">
              <button>Browse</button>
              {/* You can add a section for browse options here */}
            </div>
          </div>
        </div>
        <button>Export</button>
      </div>
    </div>
  );
};

export default AlertTable;
