
import React, { useState,addEventListener, useEffect, Component } from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';
import { js2xml } from 'xml-js';
import './CSS Files/AlertTable.css';



class AlertTable extends Component {
  constructor(){
    super();
    this.state={
      data:[{}],
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  state={
    // data:[{"level": 'Low',"time": 8.233,"ipSource": '192.12.4.101',"port": 88,"description": 'Multiple password attempts',}],
    data: [{'level': 'Low', 'alert_id': "20", 'time':"9:20", 'src_port': "80", 'dst_port': "90", 'description':"80->90", 'src_ip':"104.1", 'dst_ip': "109.2", 'reason': "for alert in alerts"}],
    sortDirection:'asc',
    sortedColumn:null,
    selectedAlert:null,
    exportModalVisible:false,
    columnVisibility:{
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
  });*/

  // const [menuVisible, setMenuVisible] = useState(false);

  // toggleMenu() {
  //   this.state.menuVisible.setState(!this.state.menuVisible);
  // };
  // handleCheckboxChange(columnName) {
  //   columnVisibility((prevState) => ({
  //     ...prevState,
  //     [columnName]: !prevState[columnName],
  //   }));
  //   this.state.columnVisibility[columnName]= !this.state.columnVisibility
  //   this.state.columnVisibility.setState(!this.state.columnVisibility);
  // };

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuVisible: !prevState.menuVisible,
    }));
  };

  handleCheckboxChange = (columnName) => {
    this.setState((prevState) => ({
      columnVisibility: {
        ...prevState.columnVisibility,
        [columnName]: !prevState.columnVisibility[columnName],
      },
    }));
  };

  handleSearchChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
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
  handleSearchChange = (event) => {
    //this.setSearchQuery(event.target.value);
    this.setState({searchQuery: event.target.value});
  };

  
  getFilteredData = () => {
    const { data, searchQuery } = this.state;

    if (!searchQuery) return data;
  
    return data.filter((item) => {
      const searchString = `${item.level} ${item.alert_id} ${item.time} ${item.src_port} ${item.dst_port} ${item.description} ${item.src_ip} ${item.dst_ip} ${item.reason}`;
      return searchString.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  handleAlertClick(alert) {
    //this.setSelectedAlert(alert);
    this.state.selectedAlert=alert
  };

  // handleExport() {
  //   //this.setExportModalVisible(true);
  //   this.state.exportModalVisible=true
  // };

  handleExport() {
    // Open the export modal
    this.setState({ exportModalVisible: true });
  }

  handleExportFormatChange(format) {
    this.setState({ exportFormat: format });
  }
  
  handleExportConfirm() {
    // Close the export modal
    this.setState({ exportModalVisible: false });
  
    // Implement export logic based on the selected format
    if (this.state.exportFormat === 'pdf') {
      // Call a function to trigger PDF export
      this.exportPDF();
    } else if (this.state.exportFormat === 'xml') {
      // Call a function to trigger XML export
      this.exportXML();
    }
  }
  
  exportPDF() {
    // Create a PDF document
    const pdfDocument = (
      <Document>
        <Page>
          <Text>PDF Export Content</Text>
        </Page>
      </Document>
    );

    // Create a download link for the PDF
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(
      new Blob([pdfDocument], { type: 'application/pdf' })
    );
    downloadLink.download = 'exported-document.pdf';
    downloadLink.click();
  }
  
  exportXML() {
    // Convert data to XML format
    const xmlData = js2xml(this.state.data, { compact: true, ignoreComment: true });

    // Create a download link for the XML
    const downloadLink = document.createElement('a');
    downloadLink.href = `data:text/xml;charset=utf-8,${encodeURIComponent(xmlData)}`;
    downloadLink.download = 'exported-data.xml';
    downloadLink.click();
  }
  

  



  render() {
    const filteredData = this.getFilteredData();

    return (
      
      <div className='table-container'>
          <input
            className = "filter-search-bar"
            type="text"
            placeholder="Search..."
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
          />
        <button className="filter-options-button" onClick={this.toggleMenu}>Filter</button>
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
    

  
        <table id='sortable-table'>
          <thead>
            <tr>
              {this.state.columnVisibility?.level && <th onClick={() => this.handleSort('Level')}>
                Level {this.state.sortedColumn === 'Level' && <span>{this.state.sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </th> }

              {this.state.columnVisibility?.alert_id && <th data-sort="numeric" onClick={() => this.handleSort('alert_id')}>
                Alert ID {this.state.sortedColumn === 'alert_id' && <span>{this.state.sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </th>}

              {this.state.columnVisibility?.time && <th data-sort="numeric" onClick={() => this.handleSort('time')}>
                Time {this.state.sortedColumn === 'time' && <span>{this.state.sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </th>}

              {this.state.columnVisibility?.src_port && <th data-sort="numeric" onClick={() => this.handleSort('src_port')}>
                Src Port {this.state.sortedColumn === 'src_port' && <span>{this.state.sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </th>}

              {this.state.columnVisibility?.dst_port && <th data-sort="numeric" onClick={() => this.handleSort('dst_port')}>
                Dst Port {this.state.sortedColumn === 'dst_port' && <span>{this.state.sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </th>}

              {this.state.columnVisibility?.description && <th>Description</th>}

              {this.state.columnVisibility?.src_ip && <th data-sort="numeric" onClick={() => this.handleSort('src_ip')}>
                Src IP {this.state.sortedColumn === 'src_ip' && <span>{this.state.sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </th>}

              {this.state.columnVisibility?.dst_ip && <th data-sort="numeric" onClick={() => this.handleSort('dst_ip')}>
                Dst IP {this.state.sortedColumn === 'dst_ip' && <span>{this.state.sortDirection === 'asc' ? '↑' : '↓'}</span>}
              </th>}
            
              {this.state.columnVisibility?.reason && <th>Alert Description</th>}
              <th>Actions</th>
              </tr>
          </thead>
          <tbody>
            {/*this.state.data?.map((item, index) => (*/filteredData.map((item, index) => (
              <tr key={index}>
                {this.state.columnVisibility?.level &&<td className={item.level?.toLowerCase()}>{item.level}</td>}

                {this.state.columnVisibility?.alert_id && <td>{item.alert_id}</td>}

                {this.state.columnVisibility?.time && <td>{item.time}</td>}

                {this.state.columnVisibility?.src_port &&<td>{item.src_port}</td>}

                {this.state.columnVisibility?.dst_port &&<td>{item.dst_port}</td>}

                {this.state.columnVisibility?.description && <td >{item.description}</td>}

                {this.state.columnVisibility?.src_ip && <td>{item.src_ip}</td>}

                {this.state.columnVisibility?.dst_ip && <td>{item.dst_ip}</td>}
            
                {this.state.columnVisibility?.reason && <td>{item.reason}</td>}
            
                
                <td >
                  <button className="actions-export-button" onClick={() => this.handleExport()}>Export</button>
                  {/* <button onClick={() => this.handleAlertClick(item)}>Details</button> */}
                </td>
              </tr>
                

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
          // <ExportOptionsModal
          //   onClose={() => this.setExportModalVisible(false)}
          // />
          <ExportOptionsModal
          onClose={() => this.setState({ exportModalVisible: false })}
          onExportFormatChange={(format) => this.handleExportFormatChange(format)}
          onExportConfirm={() => this.handleExportConfirm()}
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
        <button  onClick={onExport}>Export</button>
      </div>
    </div>
  );
};

const ExportOptionsModal = ({ onClose, onExportFormatChange, onExportConfirm }) => {
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
              onChange={() => onExportFormatChange('pdf')}
            />
            <label htmlFor="export-pdf">PDF</label>

            <input
              type="radio"
              id="export-xml"
              name="export-as"
              value="XML"
              onChange={() => onExportFormatChange('xml')}
            />
            <label htmlFor="export-xml">XML</label>
          </div>
        </div>

        <div className="export-option">
          <label>Save In:</label>
          <div className="save-in-options">
          </div>
        </div>
      </div>

      <button className="actions-export-button" onClick={onExportConfirm}>Export</button>
    </div>
    </div>
  );
};



// const ExportOptionsModal = ({ onClose }) => {
//   return (
//     <div className="export-options-modal">
//       <div className="modal-content2">
//         <span className="close-button" onClick={onClose}>
//           &times;
//         </span>
//         <h3>Export Options</h3>
//         <div className="export-options">
//           <div className="export-option">
//             <label>Export As:</label>
//             <div className="export-as-options">
//               <input
//                 type="radio"
//                 id="export-pdf"
//                 name="export-as"
//                 value="PDF"
//               />
//               <label htmlFor="export-pdf">PDF</label>

//               <input
//                 type="radio"
//                 id="export-xml"
//                 name="export-as"
//                 value="XML"
//               />
//               <label htmlFor="export-xml">XML</label>
//             </div>
//           </div>

//           <div className="export-option">
//             <label>Save In:</label>
//             <div className="save-in-options">
//               <button>Browse</button>
//               {/* You can add a section for browse options here */}
//             </div>
//           </div>
//         </div>
//         <button>Export</button>
//       </div>
//     </div>
//   );
// };

export default AlertTable;
