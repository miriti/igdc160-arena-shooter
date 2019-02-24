module.exports = class Weapon {
  constructor() {
    this.name = "Generic Weapon";
    this.recoilTime = 0.5;
    this.recoil = 0;
    this.projPerShot = 1;
    this.fire = false;
    this.firingTime = 0;
    this.spreadMin = 0;
    this.spreadMax = 0;
    this.spreadTime = 0;
    this.target = { x: 0, y: 0 };
  }

  get spread() {
    if (this.spreadMin == this.spreadMax) {
      return this.spreadMin;
    }

    return (
      this.spreadMin +
      (this.spreadMax - this.spreadMin) *
        (Math.min(this.firingTime, this.spreadTime) / this.spreadTime)
    );
  }

  pull(target) {
    this.fire = true;
    this.target.x = target.x;
    this.target.y = target.y;
  }

  release() {
    this.fire = false;
  }

  update(delta) {
    if (this.recoil > 0) {
      this.recoil = Math.max(0, this.recoil - delta);
    }

    if (this.fire) {
      this.firingTime += delta;
    } else {
      if (this.firingTime > 0) {
        this.firingTime = Math.max(0, this.firingTime - delta);
      }
    }
  }

  projectileFactory() {
    return null;
  }

  reset() {
    this.fire = false;
    this.recoil = 0;
  }

  projectiles() {
    if (this.fire && this.recoil <= 0) {
      this.recoil = this.recoilTime;
      let projectiles = [];
      for (let i = 0; i < this.projPerShot; i++) {
        projectiles.push(this.projectileFactory());
      }
      return projectiles;
    }
    return null;
  }
};
