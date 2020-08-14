import React from 'react';
import whatsappIcon from '../../assets/icons/whatsapp.svg'
import './styles.css'
import api from '../../services/api';

export interface Teacher {
    id: number,
    avatar: string,
    bio: string,
    cost: number,
    name: string,
    subject: string,
    watsapp: string
}
interface TeacherItemProps {
    teacher: Teacher

}


const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

    function createNewConnections() {
        api.post('connections', {
            user_id: teacher.id
        }).then()
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>{teacher.bio}</p>
            <footer>
                <p>
                    Preço/hora
                <strong>R$ {teacher.cost}</strong>
                </p>
                <a target="_blank" onClick={createNewConnections} href={`https://wa.me/+55${teacher.watsapp}`}>
                    <img src={whatsappIcon} alt="Whatsapp" />
                            Entrar em contato.
                        </a>
            </footer>
        </article>
    )
}
export default TeacherItem