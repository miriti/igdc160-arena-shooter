module.exports = class Weapon {
  constructor() {
    this.name = "Generic Weapon";

    this.recoilTime = 0.5;
    this.recoil = 0;
    this.projPerShot = 1;
    this.fire = false;
    this.spreadMin = 3;
    this.spreadMax = 15;
    this.spreadTime = 3;
    this.spreadCurrent = this.spreadMin;
  }

  pull() {
    this.fire = true;
  }

  release() {
    this.fire = false;
  }

  update(delta) {
    if (this.recoil > 0) {
      this.recoil = Math.max(0, this.recoil - delta);
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
