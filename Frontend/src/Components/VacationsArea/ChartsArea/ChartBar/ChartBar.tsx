import "./ChartBar.css";

function ChartBar(props: any): JSX.Element {

    let barFillHeight = "0%"; // setting default bar fill height in % - later we use it to define the height of each bar in comparison to maxValue
    if (props.maxValue > 0) {
        barFillHeight = Math.ceil((props.value / props.maxValue) * 100) + "%";
    }

    return (
        <>
            <div className="ChartBar">

                <div className="column" style={{ height: barFillHeight }}>
                    <div className="value">{props.value}</div>
                </div>
                <div className="label">{props.label}</div>

            </div>
        </>
    );
}

export default ChartBar;
