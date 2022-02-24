const TicketForm = (props) => {
  return (
    <div>
      {props.isCreation && <h1>Ticket Creation</h1>}
      {!props.isCreation && <h1>Ticket Update</h1>}
      <form>
        <input type="text" name="" id="" />
        <select name="" id=""></select>
        <input type="checkbox" name="" id="" />
        <input type="submit" value="" />
      </form>
    </div>
  );
};

export default TicketForm;
