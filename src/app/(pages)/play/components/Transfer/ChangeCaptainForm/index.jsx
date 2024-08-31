import { useSelector } from 'react-redux'

const ChangeCaptainForm = () => {
  const { GOA, DEF, MID, STR } = useSelector((state) => state.game)

  return (
    <form className="mt-2 flex justify-between text-black">
      <div className="flex flex-col gap-1 text-neutral-200">
        <select
          name="formation"
          id="formation"
          className="w-48 -skew-x-12 rounded-sm border border-neutral-900 bg-neutral-950 p-2 font-semibold text-neutral-200 outline-none"
        >
          <option
            value=""
            className="bg-neutral-950 checked:bg-neutral-900"
            defaultChecked
          >
            Kapitan
          </option>
          {GOA.map((player) => (
            <option
              className="bg-neutral-950 checked:bg-neutral-900"
              value={player.name}
              key={player.id}
            >
              {player.name}
            </option>
          ))}
          {DEF.map((player) => (
            <option
              className="bg-neutral-950 checked:bg-neutral-900"
              value={player.name}
              key={player.id}
            >
              {player.name}
            </option>
          ))}
          {MID.map((player) => (
            <option
              className="bg-neutral-950 checked:bg-neutral-900"
              value={player.name}
              key={player.id}
            >
              {player.name}
            </option>
          ))}
          {STR.map((player) => (
            <option
              className="bg-neutral-950 checked:bg-neutral-900"
              value={player.name}
              key={player.id}
            >
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        onClick={(e) => e.preventDefault()}
        className="-skew-x-12 rounded-sm bg-black px-10 text-lg text-white transition-all hover:bg-primary hover:bg-opacity-75 hover:text-black"
      >
        Saqlash
      </button>
    </form>
  )
}

export default ChangeCaptainForm
