import "./ChartBar.css";

function ChartBar(props: any): JSX.Element {
    console.log("Values: " + props.value);
    console.log("Max value: " + props.maxValue);

    let barFillHeight = "0%";
    if (props.maxValue > 0) {
        barFillHeight = Math.ceil((props.value / props.maxValue) * 100) + "%";
    }

    console.log('height: ' + barFillHeight);

    return (
        <>
            <div className="ChartBar">

                <div className="column" style={{ height: barFillHeight, backgroundColor: "lightblue" }}>
                    <div className="value">{props.value}</div>
                </div>
                <div className="label">{props.label}</div>

            </div>
        </>
    );
}

export default ChartBar;
