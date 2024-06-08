"use client"

export const CountFilter = ({
    emailsToShow,
    setEmailsToShow,
    setShowClassification
}: {
    emailsToShow: number,
    setEmailsToShow: any,
    setShowClassification: any
}) => {
    const choiceArray = [5, 10, 15, 20, 25, 30];
    return (
        <select
            value={emailsToShow}
            onChange={(e) => {
              setEmailsToShow(parseInt(e.target.value));
              setShowClassification(false);
            }}
            className="text-white text-sm bg-black p-2 rounded hover:bg-slate-900"
          >
            {choiceArray.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
    )
}