import React from 'react'
import {HeaderButton} from "react-navigation-header-buttons"
import { FontAwesome} from "@expo/vector-icons"

export const AppHeaderIcon = props => (
    <HeaderButton
        {...props}
        iconSize={26}
        IconComponent={FontAwesome}
    />)
