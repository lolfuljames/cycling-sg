import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';


const SubTest = props => (
    <tr>
      <td>{props.test.test1}</td>
      <td>{props.test.test2}</td>
      <td>{props.test.test3}</td>
      <td>
          <Link to={"/edit/"+props.test._id}>Edit</Link>
      </td>
    </tr>
  )

const log = console.log;

export default function Test() {

    const [testList, setTestList] = useState([]);
  
    useEffect(() => {
      axios.get('/test')
        .then(res => {
          log(res.data);
          setTestList(res.data);
        })
    }, [])
  
    useEffect(() => {
      log("testList: ", testList)
    }, [testList])
  
    const addTest = () => {
      const newTest = {
        test1: 'abc',
        test2: 'def',
        test3: false
      }
  
      axios({
        method: 'post',
        url: '/test/add',
        data: newTest
      }).then(res => console.log(res.data));
    }
  
    const renderTestList = () => {
      return testList.map((curr, i) => {
        return <SubTest test={curr} key={i} />;
      })
    }

    return (
        <div>
            <h3>Todos List</h3>
            <table style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Test1</th>
                        <th>Test2</th>
                        <th>Test3</th>
                    </tr>
                </thead>
                <tbody>
                    { renderTestList() }
                </tbody>
            </table>
            <Button onClick={addTest}>
                Add Test
            </Button>
            <Button>
                Edit Test
            </Button>
        </div>
    )
}