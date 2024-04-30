import React from 'react'
import { TimePicker, Switch } from "antd";

export default function OpeningHoursField() {
  const handleTimeChange = (dates: any, dateStrings: [string, string]) => {
    console.log('Start Time:', dateStrings[0]);
    console.log('End Time:', dateStrings[1]);
  };
  const handSwitchChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  
  
  return (
    <div>
      <div className='flex gap-5'>
        <p>Monday</p>
        <Switch checkedChildren="Open" unCheckedChildren="Closed" defaultChecked onChange={handSwitchChange}/>
      </div>
      <TimePicker.RangePicker placeholder={['Opens at', 'Closes at']} onChange={handleTimeChange}/>
    </div>
  )
}
