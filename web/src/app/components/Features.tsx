export default function Features() {
  return (
    <section>
      <div className="container">
        <div className="row">
          {features.map((feature, index) => (
            <div className="flex justify-between items-start">
              <figure>
                <Image />
              </figure>
              <div>
                <h4>

                </h4>
                <p>

                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
