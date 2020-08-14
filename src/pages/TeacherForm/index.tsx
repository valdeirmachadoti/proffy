import React, { useState, FormEvent } from 'react'
import PageHeader from '../../components/PageHeader';
import { useHistory } from 'react-router-dom'
import './styles.css'
import Input from '../../components/Input';
import warningIcon from '../../assets/icons/warning.svg'
import Textarea from '../../components/Textarea';
import Select from '../../components/Select/index';
import api from '../../services/api';

function TeacherForm() {
    const history = useHistory()
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItens, setScheduleItens] = useState([
        { week_day: 0, from: '', to: '' }
    ])

    function addNewScheduleItem() {
        setScheduleItens([
            ...scheduleItens,
            {
                week_day: 0, from: '', to: ''
            }
        ]);
    }

    //setScheduleItemValue (0, 'week_day', '2')
    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItens = scheduleItens.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        })
        setScheduleItens(updateScheduleItens)
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault()

        api.post('classes', {
            name,
            avatar,
            watsapp: whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItens
        }).then(() => {
            alert('Cadastro realizado com Sucesso!')
            history.push('/')
        }).catch(() => {
            alert('Erro durante o Cadastro')
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo agora é preencher esse formulário de inscrição"
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Educação Física', label: 'Educação Física' },
                                { value: 'Portugues', label: 'Português' },
                                { value: 'Matemática', label: 'Matemáticas' },
                                { value: 'Química', label: 'Química' },
                                { value: 'Geografia', label: 'Geografia' }
                            ]}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários deisponíveis
                    <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                    </button>
                        </legend>

                        {scheduleItens.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' }
                                        ]}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            )
                        })}

                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar cadastro
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm