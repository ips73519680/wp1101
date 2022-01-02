const Subscription = {
  message: {
    subscribe(parent, { chatBoxName }, { db, pubsub }, info) {
      // find chatboxname in db. if not found, throw new Error.
      return pubsub.asyncIterator(`message in box ${chatBoxName}`);
    }
  }
}

export default Subscription