import "./WeekPage.scss";

export default function WeekPage() {

    const meals = [
        { name: "California Grilled Chicken Avocado and Mango Salad", link: "https://www.skinnytaste.com/california-grilled-chicken-avocado-and/" },
        { name: "Out" },
        { name: "Pizza & Nachos" },
        { name: "Chicken Fingers with Gravy" },
        { name: "Breakfast" },
        { name: "Camp" },
        { name: "Camp" }
    ]

    const daysOfTheWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    return (
        <div className="page">
            <div className="week">
                {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="day">
                        <label>{daysOfTheWeek[i]}: </label>
                        {meals[i].link
                            ? <a href={meals[i].link}>{meals[i].name}</a>
                            : <p>{meals[i].name}</p>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

