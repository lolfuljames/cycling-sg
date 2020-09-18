import React from 'react'
import './SidePanel.css';

export default function SidePanel() {
    return (
        <div id="side-panel-container">
            <div id="side-panel">

                <div id="side-panel-title">
                    Routes
                </div>
                <button id="custom-route-transition-button">
                    <span class="iconify" data-icon="clarity:add-line" data-inline="false" data-width="30"></span>
                </button>
                {/* <PresetList/> */}
            </div>
        </div>
    )
}
