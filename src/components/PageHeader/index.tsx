import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import backIcon from '../../assets/icons/back.svg'
import logoImg from '../../assets/images/logo.svg'

//Definindo Tipagens
interface PageHeaderProps {
    title: string
    description?: string
    // title?: string // Não obrigatorio
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {

    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/" >
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <img src={logoImg} alt="Proffy" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {/* {props.description ? <p>{props.description}</p> : null} */}
                {props.description && <p>{props.description}</p>} 
                {props.children}
            </div>
        </header>
    )
}

export default PageHeader