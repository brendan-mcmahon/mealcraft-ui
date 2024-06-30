import "./WeekPage.scss";

export default function WeekPage() {

    const meals = [
        "Pasta",
        "Tacos",
        "Pizza",
        "Chicken",
        "Salad",
        "Soup",
        "Sandwiches"
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
                        <p>{meals[i]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

