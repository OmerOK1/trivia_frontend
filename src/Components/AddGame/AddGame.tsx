import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form'
import * as yup from "yup";
import { GameModel } from '../Models/GameModel';
import { Category } from '../Models/Enums/Category';
import { Difficulty } from '../Models/Enums/Difficulty';
import { LayoutEnum } from '../Models/Enums/LayoutEnum';
// import { addCompanyApi } from '../../../WebApi/AdminApi';
// import { ClientType } from '../../../Models/ClientType';
// import { CompanyModel } from '../../../Models/CompanyModel';
// import store from '../../../Redux/Store';
// import notify, { ErrMsg, SccMsg } from '../../../Services/Notification';
// import { addCompanyAction } from '../../../Redux/CompanyState';

function AddGame() {
    
    const navigate = useNavigate();
    const [inTimeout, setInTimeout] = useState(false);

    const schema = yup.object().shape({  
        title: 
            yup.string().required("company name is required"),
        questionsPerRound:
            yup.number().integer().min(1).max(10).required("insert amount between 1 - 10"),
        id:
            yup.number(),
        url:
            yup.string(),
        category:
            yup.string().required("please enter wanted category"),
        difficulty:
            yup.string().required("please enter difficulty level"),
        layout:
            yup.string()
    });
    
    

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = 
    useForm<GameModel>({ mode: "all", resolver: yupResolver(schema)});

        
    const addGame = async (game: GameModel)=> { }
    //     if (inTimeout) {return;}
    //     setInTimeout(true);
    //     await addCompanyApi(game).then((res)=>{
    //         notify.success(SccMsg.COMPANY_CREATE_SUCCESS);
    //         store.dispatch(addCompanyAction(res.data));
    //         navigate("/companies");
    //     })
    //     .catch ((error)=>{
    //         notify.error(error);
    //     })
    //     setTimeout(() => setInTimeout(false), 3000);         
    // }
    

    return (
        <div>
            <h1>Add New Company</h1>
            {/* Step 9 - handleSubmit your form  */}

            <form onSubmit={handleSubmit(addGame)} className="add_game_form flex-center-col">

                <input {...register("id")} hidden value={1}/>

                <label htmlFor="title">game title</label>
                <input {...register("title")} type="title" placeholder= "title" id="title" />
                <span className="validation_rules">{errors.title?.message}</span>
                <br />

                <label htmlFor="category">Category</label>
                <select {...register("category")} placeholder="category" defaultValue="" id="category"> 
                <option value="" disabled>Category</option>
                {Object.keys(Category).map((key, index) => (
                <option
                aria-selected="true"
                key={key}
                value={key}
                >{Object.values(Category)[index]}
                </option>
                ))}
                </select>
                <span className="validation_rules">{errors.category?.message}</span>
                <br />

                <label htmlFor="difficulty">difficulty</label>
                <select {...register("difficulty")} placeholder="difficulty" defaultValue="" id="difficulty"> 
                <option value="" disabled>difficulty</option>
                {Object.keys(Difficulty).map((key, index) => (
                <option
                aria-selected="true"
                key={key}
                value={key}
                >{Object.values(Difficulty)[index]}
                </option>
                ))}
                </select>
                <span className="validation_rules">{errors.difficulty?.message}</span>
                <br />

                <label htmlFor="layout">layout</label>
                <select {...register("layout")} placeholder="layout" defaultValue="" id="layout"> 
                <option value="" disabled>layout</option>
                {Object.keys(LayoutEnum).map((key, index) => (
                <option
                aria-selected="true"
                key={key}
                value={key}
                >{Object.values(LayoutEnum)[index]}
                </option>
                ))}
                </select>
                <span className="validation_rules">{errors.layout?.message}</span>
                <br />



                <button className="button-success" disabled={!isValid}>Create Now</button>
            </form>
        </div>
    );
}

export default AddGame;