import React, {Component, Fragment} from 'react'
import {Button, Input} from '@mt/styleguide'

export default function App (props) {
        return(
            <Fragment>
                <div>Hello Evan App view.</div>
                <Button
                    className="colorName"
                    onClick={()=>{alert('###')}}
                >Clikc me</Button>
                <Input defaultVal="Hahaha" />
            </Fragment>
        )        
}
